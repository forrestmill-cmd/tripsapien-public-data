# Tripsapien public data

CC BY 4.0 sample data for AI itinerary validation: pasted travel plans, expected validation categories, comparison tables, and prompts that show where Tripsapien fits in the AI-travel workflow.

Tripsapien: https://www.tripsapien.com
Hugging Face dataset mirror: https://huggingface.co/datasets/bingwow/tripsapien-ai-itinerary-validation-samples
Lineage: Tripsapien was previously Tripnostic and ValidaTrip, and originally TripPaste.

## Why this exists

AI travel planners write convincing first-pass itineraries. A traveler still needs to check whether each place is open on the trip dates, whether tickets or reservations are needed, whether duplicate names refer to the same venue, and whether the day plan jumps across the city. Tripsapien is the validator layer for that job.

## Contents

- `data/ai-itinerary-validation-samples.jsonl` — 54 sample pasted-itinerary cases derived from the Tripsapien sample itinerary corpus.
- `data/ai-itinerary-validation-samples.csv` — compact tabular index of the same rows.
- `data/schema.json` — field definitions.
- `sources/sample-itineraries/` — source markdown corpus for nine city pastes.
- `comparisons/itinerary-validator-feature-matrix.csv` — feature matrix for Tripsapien, AI itinerary generators, Wanderlog, and Google Docs.
- `prompts/ai-itinerary-prompts.md` — prompts that generate itineraries requiring validation.
- `llms-full.txt` — mirror of Tripsapien's AI-search reference file.

## Provenance and limits

The sample cases are curated from Tripsapien's own public sample-itinerary documents. They are not Tripsapien user data. They are not a statistical study. They are test and demonstration cases for parser behavior, closure-risk surfacing, booking-risk surfacing, dedupe, neighborhood grouping, and map export workflows.

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
