#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile('data/dataset-manifest.json', 'utf8'));
const failures = [];

for (const entry of manifest.files) {
  const bytes = await readFile(entry.path);
  const actualHash = createHash('sha256').update(bytes).digest('hex');
  if (actualHash !== entry.sha256) {
    failures.push(`${entry.path}: sha256 ${actualHash} != ${entry.sha256}`);
  }

  if (entry.records !== undefined) {
    const text = bytes.toString('utf8').trimEnd();
    const lineCount = text ? text.split(/\r?\n/).length : 0;
    const actualRecords = entry.path.endsWith('.csv') ? Math.max(0, lineCount - 1) : lineCount;
    if (actualRecords !== entry.records) {
      failures.push(`${entry.path}: records ${actualRecords} != ${entry.records}`);
    }
  }
}

const samples = (await readFile('data/ai-itinerary-validation-samples.jsonl', 'utf8'))
  .trim()
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line));
const expected = manifest.ai_itinerary_samples;
const sourceCounts = Object.fromEntries(
  [...new Set(samples.map((row) => row.simulated_ai_or_source))]
    .sort()
    .map((source) => [
      source,
      samples.filter((row) => row.simulated_ai_or_source === source).length,
    ]),
);
const fieldMap = {
  places_or_notes: 'total_places_or_notes',
  opening_hours_checks: 'opening_hours_checks',
  booking_ahead_flags: 'booking_ahead_flags',
  dedupe_candidates: 'dedupe_candidates',
  vague_place_flags: 'vague_place_flags',
  day_trip_flags: 'day_trip_flags',
  map_urls: 'map_url_count',
};
const expectedTotals = Object.fromEntries(
  Object.entries(fieldMap).map(([manifestKey, rowKey]) => [
    manifestKey,
    samples.reduce(
      (sum, row) => sum + Number(row.expected_outcomes?.[rowKey] ?? 0),
      0,
    ),
  ]),
);
const derived = {
  records: samples.length,
  cities: new Set(samples.map((row) => row.city)).size,
  case_shapes: new Set(samples.map((row) => row.sample_kind)).size,
  simulated_source_labels: sourceCounts,
  author_expected_totals: expectedTotals,
};
for (const [key, value] of Object.entries(derived)) {
  if (JSON.stringify(value) !== JSON.stringify(expected[key])) {
    failures.push(
      `ai_itinerary_samples.${key}: ${JSON.stringify(value)} != ${JSON.stringify(expected[key])}`,
    );
  }
}

const eventSnapshot = JSON.parse(await readFile('data/indexed-event-months.json', 'utf8'));
const stableEventSlugs = eventSnapshot.stable_indexable_city_slugs;
const stableEventSet = new Set(stableEventSlugs);
if (stableEventSet.size !== stableEventSlugs.length) {
  failures.push('data/indexed-event-months.json: duplicate stable city slugs');
}
if (stableEventSet.size !== eventSnapshot.evidence_counts.stable_and_indexable) {
  failures.push(
    `data/indexed-event-months.json: ${stableEventSet.size} stable slugs != ${eventSnapshot.evidence_counts.stable_and_indexable}`,
  );
}

const cityRows = (await readFile('data/tripsapien-city-hubs.jsonl', 'utf8'))
  .trim()
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line));
const citySlugs = new Set(cityRows.map((row) => row.city_slug));
for (const slug of stableEventSet) {
  if (!citySlugs.has(slug)) failures.push(`indexed event snapshot: unknown city ${slug}`);
}
for (const row of cityRows) {
  const expectedEventUrl = stableEventSet.has(row.city_slug)
    ? `https://www.tripsapien.com/events/${row.city_slug}/${eventSnapshot.month_slug}`
    : null;
  if (row.current_event_url !== expectedEventUrl) {
    failures.push(
      `${row.city_slug}: current_event_url ${JSON.stringify(row.current_event_url)} != ${JSON.stringify(expectedEventUrl)}`,
    );
  }
}

function parseCsvLine(line) {
  const fields = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === ',' && !quoted) {
      fields.push(field);
      field = '';
    } else {
      field += character;
    }
  }
  fields.push(field);
  return fields;
}

const cityCsvLines = (await readFile('data/tripsapien-city-hubs.csv', 'utf8'))
  .trim()
  .split(/\r?\n/);
const cityCsvHeader = parseCsvLine(cityCsvLines.shift());
const citySlugIndex = cityCsvHeader.indexOf('city_slug');
const eventUrlIndex = cityCsvHeader.indexOf('current_event_url');
if (cityCsvLines.length !== cityRows.length) {
  failures.push(`city CSV: ${cityCsvLines.length} rows != ${cityRows.length} JSONL rows`);
}
for (const line of cityCsvLines) {
  const fields = parseCsvLine(line);
  const slug = fields[citySlugIndex];
  const expectedEventUrl = stableEventSet.has(slug)
    ? `https://www.tripsapien.com/events/${slug}/${eventSnapshot.month_slug}`
    : '';
  if (fields[eventUrlIndex] !== expectedEventUrl) {
    failures.push(
      `${slug}: CSV current_event_url ${JSON.stringify(fields[eventUrlIndex])} != ${JSON.stringify(expectedEventUrl)}`,
    );
  }
}

const publicationFiles = [
  'README.md',
  'index.html',
  'CITATION.cff',
  'data/schema.json',
  'data/dataset-manifest.json',
  'comparisons/itinerary-validator-feature-matrix.csv',
  'prompts/ai-itinerary-prompts.md',
];
for (const path of publicationFiles) {
  const text = await readFile(path, 'utf8');
  if (/\bTripsapien\b/.test(text)) failures.push(`${path}: use exact brand casing TripSapien`);
}

const matrix = await readFile('comparisons/itinerary-validator-feature-matrix.csv', 'utf8');
if (/checks_live_opening_hours|source-cites-only/.test(matrix)) {
  failures.push('comparison matrix: unsupported current-product feature assertions remain');
}
const prompts = await readFile('prompts/ai-itinerary-prompts.md', 'utf8');
if (/do not reliably verify/i.test(prompts)) {
  failures.push('prompts: universal assistant reliability claim remains');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(
  `Verified ${manifest.files.length} files for ${manifest.name} ${manifest.version}`,
);
