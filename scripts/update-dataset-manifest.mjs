#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const manifestPath = 'data/dataset-manifest.json';
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

for (const entry of manifest.files) {
  const bytes = await readFile(entry.path);
  entry.sha256 = createHash('sha256').update(bytes).digest('hex');
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Updated ${manifest.files.length} SHA-256 digests in ${manifestPath}`);
