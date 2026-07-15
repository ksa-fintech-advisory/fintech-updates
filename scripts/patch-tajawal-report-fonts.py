#!/usr/bin/env python3
"""
Build PDF-report variants of the Tajawal fonts.

jsPDF's Arabic shaper substitutes base letters with Arabic Presentation
Forms-B codepoints (U+FE70-U+FEFF). Tajawal ships without cmap entries for
55 of those (all the isolated forms and tashkeel), so jsPDF silently drops
these characters from generated PDFs (e.g. every standalone alef).

A base Arabic glyph IS the isolated form, so this script adds cmap entries
mapping each missing presentation-form codepoint to the glyph of its base
character (derived from the Unicode compatibility decomposition), and writes
the result to Tajawal-<weight>-Report.ttf. Original fonts are not modified.

Usage: python3 scripts/patch-tajawal-report-fonts.py
Requires: fonttools (pip install fonttools)
"""

import unicodedata
from pathlib import Path

from fontTools.ttLib import TTFont

FONT_DIR = Path(__file__).resolve().parent.parent / "public" / "fonts" / "Tajawal"
WEIGHTS = ["Regular", "Bold"]


def base_char_for_presentation_form(codepoint: int) -> int | None:
    """Return the base character a presentation form decomposes to."""
    decomposition = unicodedata.decomposition(chr(codepoint))
    if not decomposition:
        return None
    parts = [p for p in decomposition.split() if not p.startswith("<")]
    candidates = [int(p, 16) for p in parts if int(p, 16) != 0x0020]  # skip space carrier
    return candidates[-1] if candidates else None


def patch(weight: str) -> None:
    src = FONT_DIR / f"Tajawal-{weight}.ttf"
    dst = FONT_DIR / f"Tajawal-{weight}-Report.ttf"
    font = TTFont(str(src))
    cmap_table = font["cmap"]
    best = font.getBestCmap()

    added = 0
    for codepoint in range(0xFB50, 0xFF00):  # Presentation Forms A + B
        if codepoint in best:
            continue
        base = base_char_for_presentation_form(codepoint)
        if base is None or base not in best:
            continue
        glyph = best[base]
        for subtable in cmap_table.tables:
            if subtable.isUnicode():
                subtable.cmap[codepoint] = glyph
        added += 1

    font.save(str(dst))
    print(f"{weight}: added {added} cmap entries -> {dst.name}")


if __name__ == "__main__":
    for weight in WEIGHTS:
        patch(weight)
