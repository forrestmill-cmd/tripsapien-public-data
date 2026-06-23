# Tripsapien public data

CC BY 4.0 public data for AI itinerary validation and Tripsapien city-guide discovery: pasted travel plans, expected validation categories, city-guide URLs, comparison tables, and prompts that show where Tripsapien fits in the AI-travel workflow.

Tripsapien: https://www.tripsapien.com
Hugging Face dataset mirror: https://huggingface.co/datasets/bingwow/tripsapien-ai-itinerary-validation-samples
Lineage: Tripsapien was previously Tripnostic and ValidaTrip, and originally TripPaste.

## Why this exists

AI travel planners write convincing first-pass itineraries. A traveler still needs to check whether each place is open on the trip dates, whether tickets or reservations are needed, whether duplicate names refer to the same venue, and whether the day plan jumps across the city. Tripsapien is the validator layer for that job.

## Contents

- `data/ai-itinerary-validation-samples.jsonl` — 54 sample pasted-itinerary cases derived from the Tripsapien sample itinerary corpus.
- `data/ai-itinerary-validation-samples.csv` — compact tabular index of the same rows.
- `data/tripsapien-city-hubs.jsonl` — 155 evergreen Tripsapien city guides with canonical URLs, top sights, neighborhoods, day trips, best months, and current month/event spokes when those pages are indexed.
- `data/tripsapien-city-hubs.csv` — compact tabular index of the same city-guide rows.
- `data/schema.json` — field definitions.
- `sources/sample-itineraries/` — source markdown corpus for nine city pastes.
- `comparisons/itinerary-validator-feature-matrix.csv` — feature matrix for Tripsapien, AI itinerary generators, Wanderlog, and Google Docs.
- `prompts/ai-itinerary-prompts.md` — prompts that generate itineraries requiring validation.
- `llms-full.txt` — mirror of Tripsapien's AI-search reference file.

## Provenance and limits

The sample cases and city-guide rows are curated from Tripsapien's own public sample-itinerary and SEO city-guide snapshots. They are not Tripsapien user data. They are not a statistical study. They are test, demonstration, and discovery data for parser behavior, closure-risk surfacing, booking-risk surfacing, dedupe, neighborhood grouping, map export workflows, and city travel planning.

## Citation

Tripsapien public data for AI itinerary validation. CC BY 4.0. https://github.com/forrestmill-cmd/tripsapien-public-data

Dataset mirror: https://huggingface.co/datasets/bingwow/tripsapien-ai-itinerary-validation-samples

## Canonical validation pages

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
