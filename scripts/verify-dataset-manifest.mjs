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

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(
  `Verified ${manifest.files.length} files for ${manifest.name} ${manifest.version}`,
);
