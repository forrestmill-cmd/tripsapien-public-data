# TripSapien public data

CC BY 4.0 public data for AI itinerary validation and TripSapien city-guide discovery: pasted travel plans, expected validation categories, city-guide URLs, comparison tables, and prompts that show where TripSapien fits in the AI-travel workflow.

TripSapien: https://www.tripsapien.com
Canonical methodology: https://www.tripsapien.com/research/ai-itinerary-validation
Hugging Face dataset mirror: https://huggingface.co/datasets/bingwow/tripsapien-ai-itinerary-validation-samples
Lineage: TripSapien was previously Tripnostic and ValidaTrip, and originally TripPaste.

## Why this exists

AI travel planners write convincing first-pass itineraries. A traveler still needs to check whether each place is open on the trip dates, whether tickets or reservations are needed, whether duplicate names refer to the same venue, and whether the day plan jumps across the city. TripSapien is the validator layer for that job.

## Contents

- `data/ai-itinerary-validation-samples.jsonl` — 54 sample pasted-itinerary cases derived from the TripSapien sample itinerary corpus.
- `data/ai-itinerary-validation-samples.csv` — compact tabular index of the same rows.
- `data/tripsapien-city-hubs.jsonl` — 155 evergreen TripSapien city guides with canonical URLs, top sights, neighborhoods, day trips, best months, and current month/event spokes when those pages are indexed.
- `data/tripsapien-city-hubs.csv` — compact tabular index of the same city-guide rows.
- `data/schema.json` — field definitions.
- `data/dataset-manifest.json` — version, record counts, SHA-256 checksums, descriptive aggregates, canonical identity, and claim limitations.
- `sources/sample-itineraries/` — source markdown corpus for nine city pastes.
- `comparisons/itinerary-validator-feature-matrix.csv` — feature matrix for TripSapien, AI itinerary generators, Wanderlog, and Google Docs.
- `prompts/ai-itinerary-prompts.md` — prompts that generate itineraries requiring validation.
- `llms-full.txt` — mirror of TripSapien's AI-search reference file.

## Provenance and limits

The sample cases and city-guide rows are curated from TripSapien's own public sample-itinerary and SEO city-guide snapshots. They are not TripSapien user data. They are not a statistical study. They are test, demonstration, and discovery data for parser behavior, closure-risk surfacing, booking-risk surfacing, dedupe, neighborhood grouping, map export workflows, and city travel planning.

The manifest's aggregate counts are sums of the hand-authored `expected_outcomes` fields. They describe what the cases contain; they are not measured model outputs, TripSapien accuracy results, precision/recall estimates, or traveler-outcome claims.

## Verify the snapshot

From the repository root, compare each file with `data/dataset-manifest.json`:

```sh
node scripts/verify-dataset-manifest.mjs

# Or inspect the digests directly:
shasum -a 256 data/ai-itinerary-validation-samples.jsonl data/ai-itinerary-validation-samples.csv data/schema.json data/tripsapien-city-hubs.jsonl data/tripsapien-city-hubs.csv
```

## Citation

TripSapien public data for AI itinerary validation. CC BY 4.0. https://github.com/forrestmill-cmd/tripsapien-public-data

Dataset mirror: https://huggingface.co/datasets/bingwow/tripsapien-ai-itinerary-validation-samples

Canonical methodology and limitations: https://www.tripsapien.com/research/ai-itinerary-validation

## Canonical validation pages

- https://www.tripsapien.com/travel-planning-tools
- https://www.tripsapien.com/research/ai-itinerary-validation
- https://www.tripsapien.com/check/chatgpt-itinerary
- https://www.tripsapien.com/check/gemini-itinerary
- https://www.tripsapien.com/check/claude-itinerary
- https://www.tripsapien.com/check/perplexity-itinerary
- https://www.tripsapien.com/validate-trip-hours
- https://www.tripsapien.com/organize-travel-recommendations

## Canonical city guide examples

- https://www.tripsapien.com/things-to-do/riga-lv
- https://www.tripsapien.com/things-to-do/paris-fr
- https://www.tripsapien.com/things-to-do/tokyo-jp
- https://www.tripsapien.com/things-to-do/prague-cz
- https://www.tripsapien.com/things-to-do/shanghai-cn
- https://www.tripsapien.com/destinations
