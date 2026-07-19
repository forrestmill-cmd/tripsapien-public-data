#!/usr/bin/env python3
"""Export the TripSapien festival calendar as an open CC-BY dataset.

Reads lib/festivals/festivalEvents.generated.json from the product repo and
emits the FACTUAL calendar core (titles, dates, geography, event typing,
pricing, official URL, recurrence rule, provenance). Prose descriptions and
image URLs are deliberately excluded: they are third-party-derived content the
CC-BY grant should not claim to cover. Facts only.

`citable_url` mirrors the product's event-citation URL gate: False when the
event_url is a search-results page (google search / wikipedia Special:Search)
rather than an official or directly informative page.

Usage:
  python3 scripts/export-festival-calendar.py \
    --source /path/to/tripsapien/lib/festivals/festivalEvents.generated.json
"""
import argparse
import csv
import hashlib
import json
import sys
from pathlib import Path

FIELDS = [
    "festival_event_id", "title", "city", "state_province", "country",
    "country_code", "seo_city_slug", "start_date", "end_date", "year",
    "month", "date_precision", "recurrence_kind", "recurrence_confidence",
    "event_type", "event_subtype", "festival_type", "category",
    "price_min", "price_max", "price_currency", "price_label",
    "event_url", "citable_url", "city_specific",
    "source_dataset", "source_row_number", "source_row_hash",
]

SEARCH_URL_MARKERS = ("google.com/search", "wikipedia.org/wiki/Special:Search")


def is_citable_url(url):
    if not url or not str(url).startswith("http"):
        return False
    return not any(m in url for m in SEARCH_URL_MARKERS)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--source", required=True)
    args = ap.parse_args()

    rows = json.loads(Path(args.source).read_text())
    out_rows = []
    for r in rows:
        rec = r.get("recurrence") or {}
        out_rows.append({
            "festival_event_id": r.get("festival_event_id"),
            "title": r.get("title"),
            "city": r.get("city"),
            "state_province": r.get("state_province"),
            "country": r.get("country"),
            "country_code": r.get("country_code"),
            "seo_city_slug": r.get("seo_city_slug"),
            "start_date": r.get("start_date"),
            "end_date": r.get("end_date"),
            "year": r.get("year"),
            "month": r.get("month"),
            "date_precision": r.get("date_precision"),
            "recurrence_kind": rec.get("kind"),
            "recurrence_confidence": r.get("recurrence_confidence"),
            "event_type": r.get("event_type"),
            "event_subtype": r.get("event_subtype"),
            "festival_type": r.get("festival_type"),
            "category": r.get("category"),
            "price_min": r.get("price_min"),
            "price_max": r.get("price_max"),
            "price_currency": r.get("price_currency"),
            "price_label": r.get("price_label"),
            "event_url": r.get("event_url"),
            "citable_url": is_citable_url(r.get("event_url")),
            "city_specific": r.get("city_specific"),
            "source_dataset": r.get("source_dataset"),
            "source_row_number": r.get("source_row_number"),
            "source_row_hash": r.get("source_row_hash"),
        })

    out_rows.sort(key=lambda x: (x["start_date"] or "9999", x["country_code"] or "", x["city"] or "", x["title"] or ""))

    data_dir = Path(__file__).resolve().parent.parent / "data"
    jsonl_path = data_dir / "festival-calendar-2026-2027.jsonl"
    csv_path = data_dir / "festival-calendar-2026-2027.csv"

    with jsonl_path.open("w", encoding="utf-8") as f:
        for row in out_rows:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")

    with csv_path.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        w.writeheader()
        w.writerows(out_rows)

    for p in (jsonl_path, csv_path):
        digest = hashlib.sha256(p.read_bytes()).hexdigest()
        print(f"{p.name}: {len(out_rows)} records sha256={digest}")

    exact = sum(1 for r in out_rows if r["date_precision"] == "exact")
    citable = sum(1 for r in out_rows if r["citable_url"])
    cities = len({(r["city"], r["country_code"]) for r in out_rows})
    print(f"stats: {len(out_rows)} events | {exact} exact-date | {citable} citable-url | {cities} distinct cities", file=sys.stderr)


if __name__ == "__main__":
    main()
