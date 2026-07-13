#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';

const snapshot = JSON.parse(await readFile('data/indexed-event-months.json', 'utf8'));
const allowed = new Set(snapshot.stable_indexable_city_slugs);
const jsonlPath = 'data/tripsapien-city-hubs.jsonl';
const csvPath = 'data/tripsapien-city-hubs.csv';
const rows = (await readFile(jsonlPath, 'utf8'))
  .trim()
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line));

const knownSlugs = new Set(rows.map((row) => row.city_slug));
const unknown = [...allowed].filter((slug) => !knownSlugs.has(slug));
if (unknown.length > 0) {
  throw new Error(`Snapshot contains unknown city slugs: ${unknown.join(', ')}`);
}

for (const row of rows) {
  row.current_event_url = allowed.has(row.city_slug)
    ? `https://www.tripsapien.com/events/${row.city_slug}/${snapshot.month_slug}`
    : null;
}

const headers = [
  'city_slug',
  'city',
  'country',
  'country_code',
  'canonical_url',
  'current_month_url',
  'current_event_url',
  'top_attractions',
  'neighborhoods',
  'day_trips',
  'best_months',
  'overview',
  'license',
  'generated_on',
];
const csvValue = (value) => {
  const text = Array.isArray(value) ? value.join('; ') : String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

await writeFile(jsonlPath, `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
await writeFile(
  csvPath,
  `${headers.join(',')}\n${rows.map((row) => headers.map((key) => csvValue(row[key])).join(',')).join('\n')}\n`,
);

console.log(
  `Synchronized ${allowed.size} evidence-backed, indexable ${snapshot.month_slug} event URLs across ${rows.length} city rows`,
);
