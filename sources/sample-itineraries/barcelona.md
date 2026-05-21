# Barcelona — sample itinerary paste

**Trip:** Mid-September 2026, 5 days, anniversary trip for a couple in their 40s
**Source mix:** friend texts (Maria, Jess), Eater Barcelona, ChatGPT, r/Barcelona, TikTok saves, the Lonely Planet Spain chapter
**Why this represents the demographic:** Type-A anniversary trip; Sagrada Família + Park Güell + Casa Batlló are all timed-entry; the neighborhood-density pain (Gothic vs. Eixample vs. Gràcia vs. El Born) is exactly what `app/trips/[tripId]/review/review-client.tsx`'s Neighborhoods tab is built for. This is also the team's canonical happy-path city — the longer-form sister of the 7-bullet stub.

---

## What got pasted in

- La Sagrada Família — book timed entry + tower access (Nativity tower for the older, Passion tower for the elevator)
- Park Güell — Monumental Zone is timed-entry, book 7+ days out, NOT the free park area
- Casa Batlló — book "Gaudí Premium" with the audioguide, evening visits add the music
- La Pedrera (Casa Milà) — book "Night Experience" rooftop with the projection show
- Picasso Museum — El Born, book online, free first Sunday and Thursday evenings after 5
- Wander the Gothic Quarter — early morning, get lost; Plaça Sant Felip Neri
- El Born neighborhood — evening tapas, Passeig del Born
- Gràcia — Plaça del Sol, vermouth bars, Festa Major in August (we'll miss it)
- Eixample — Passeig de Gràcia for Modernisme architecture (Block of Discord)
- La Boqueria Market — closed Sundays, El Pinotxo bar for breakfast (Juanito's stool)
- Mercat de Sant Antoni — less touristy alternative, Sunday book + coin market in the morning
- Cal Pep — tapas counter, walk-in 1:30pm sharp (closed Sun/Mon), the seafood plate
- Quimet & Quimet — tiny standing-only tapas, walk-in, the montaditos
- Bar Cañete — El Raval, book a week ahead, the chef's counter
- Disfrutar — 3-star Michelin, Eixample, book 6 months out (no joke, the menu is the spinoff from elBulli)
- El Xampanyet — cava bar El Born, walk-in (closed Mondays), anchovies + cava
- Granja M. Viader — chocolate con churros near La Boqueria, oldest dairy in Barcelona
- Federal Café — Sant Antoni branch, Australian-style brunch
- Bar Mut — Eixample, natural wine bar, walk-in (squeeze in at the counter)
- Day trip: Montserrat — train from Plaça Espanya, half-day, the boys' choir at 1pm if a school day
- Day trip: Sitges — beach town, 30 min by train from Passeig de Gràcia
- Day trip: Girona — Game of Thrones filming spots, full day by AVE high-speed
- Tibidabo — funicular up, view of the entire city plus the small amusement park at the top
- Bunkers del Carmel — sunset viewpoint, free, BYO beer and snacks, 30-min walk uphill from the metro
- Camp Nou — under renovation through 2026, tours likely suspended (check status before going)
- Beach — Barceloneta is the famous one but Bogatell is calmer and the same sand
- Flamenco at Tablao Cordobés — touristy but a real flamenco intro, book the dinner + show combo
- https://maps.app.goo.gl/HrTk7DfLpYnX9JdQ4 — Maria's Gràcia vermut pin (probably Bodega Marín or Quimet)
- ChatGPT day 4: morning Hospital de Sant Pau (more underrated than Casa Batlló), lunch at Bar Brutal (El Born), afternoon walk Parc del Laberint d'Horta
- r/Barcelona: Brunch & Cake — multiple locations, expect queues, the carrot cake
- From Jess: "the pink-awning café near the Born that has the BEST carrot cake — Brunch & Cake?"
- Park Guell — same as Park Güell above, the accents tripped Jess up (dedupe candidate)
- Possibly closed: Camp Nou (already flagged above) and Bunkers del Carmel summit (sometimes shut at sunset for crowd control)

---

## Notes
- 32 items, five attributed sources, one Google Maps URL, one vague item ("pink-awning café"), one duplicate (Park Güell × 2 with different spelling — exercises `lib/validation/dedupe.ts` Jaccard threshold), two possibly-closed
- All venues real and at their correct Barcelona neighborhoods (Eixample, El Born, El Raval, Gràcia, Sant Antoni, Gothic Quarter, Barceloneta, Bogatell)
- The "Jess wrote 'Park Guell' once and 'Park Güell' once in the same paste" pattern is exactly the dedupe case the parser is built to surface as a merge candidate
- The 7-bullet happy-path Barcelona stub (`e2e/specs/happy-path.spec.ts`) is the smoke-test version of this same trip — this file is the realistic version
