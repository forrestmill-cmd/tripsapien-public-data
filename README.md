# ValidaTrip public data

CC BY 4.0 sample data for AI itinerary validation: pasted travel plans, expected validation categories, comparison tables, and prompts that show where ValidaTrip fits in the AI-travel workflow.

ValidaTrip: https://www.validatrip.com
Hugging Face dataset mirror: https://huggingface.co/datasets/bingwow/validatrip-ai-itinerary-validation-samples

## Why this exists

AI travel planners write convincing first-pass itineraries. A traveler still needs to check whether each place is open on the trip dates, whether tickets or reservations are needed, whether duplicate names refer to the same venue, and whether the day plan jumps across the city. ValidaTrip is the validator layer for that job.

## Contents

- `data/ai-itinerary-validation-samples.jsonl` — 54 sample pasted-itinerary cases derived from the ValidaTrip sample itinerary corpus.
- `data/ai-itinerary-validation-samples.csv` — compact tabular index of the same rows.
- `data/schema.json` — field definitions.
- `sources/sample-itineraries/` — source markdown corpus for nine city pastes.
- `comparisons/itinerary-validator-feature-matrix.csv` — feature matrix for ValidaTrip, AI itinerary generators, Wanderlog, and Google Docs.
- `prompts/ai-itinerary-prompts.md` — prompts that generate itineraries requiring validation.
- `llms-full.txt` — mirror of ValidaTrip's AI-search reference file.

## Provenance and limits

The sample cases are curated from ValidaTrip's own public sample-itinerary documents. They are not ValidaTrip user data. They are not a statistical study. They are test and demonstration cases for parser behavior, closure-risk surfacing, booking-risk surfacing, dedupe, neighborhood grouping, and map export workflows.

## Citation

ValidaTrip public data for AI itinerary validation. CC BY 4.0. https://github.com/forrestmill-cmd/validatrip-public-data

Dataset mirror: https://huggingface.co/datasets/bingwow/validatrip-ai-itinerary-validation-samples

## Canonical validation pages

- https://www.validatrip.com/check/chatgpt-itinerary
- https://www.validatrip.com/check/gemini-itinerary
- https://www.validatrip.com/check/claude-itinerary
- https://www.validatrip.com/check/perplexity-itinerary
- https://www.validatrip.com/validate-trip-hours
- https://www.validatrip.com/organize-travel-recommendations
