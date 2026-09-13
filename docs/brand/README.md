# Liza's Lace — brand guide

Source of truth: `LizasLace_BrandGuide.pdf` (and `brand-guide.png`, a capture
of the same page). Everything below was read off those files rather than
guessed — colours were sampled from the guide's own swatches, and the font
names were pulled from the PDF's embedded font table.

## Name and details

- **Liza's Lace Atelier** — note the guide always sets "ATELIER" as part of
  the mark. The site currently uses "Liza's Lace" alone.
- Curated By **Brigitte Quinn**
- No. 85 Beckwith Avenue, Southold, NY
- www.lizaslace.com

## Colours

The guide prints two swatches. The pink's CMYK is stated; the dark one is
printed as `C:0 M:0 Y:0 K:0`, which would be white — that is a typo in the
guide, and the swatch as drawn is a rich near-black.

| Swatch | Printed CMYK | Sampled RGB |
| --- | --- | --- |
| Pink | C24 M65 Y30 K1 | `#C07188` |
| Near-black | C0 M0 Y0 K0 *(typo)* | `#231F20` |

Both are live in `src/styles/theme.ts` verbatim, as `pink` and `ink`. The
remaining tokens are derived from them with the hue locked to the pink
(342.5deg), so the neutrals stay warm rather than going grey.

Two things the guide's two colours cannot do on their own, both resolved by
measurement rather than taste:

- **White on the pink is 3.52:1** — under AA for 12px. Pink buttons take
  `ink` text instead (4.63:1), deepening to `pinkDeep` with white on hover.
- **Secondary copy needed darkening** to `#77696D`, the point where it clears
  4.5:1 on `tint`, the lightest ground it sits on.

## Fonts

- **Millie June** — display. Installed and in use; see `FONTS.md`.
- **Avenir** — interface. Not installed; licence and format both block it.
  See `FONTS.md`.

(The PDF also embeds Gill Sans, but that is used for the guide document's own
labels — "Full Text Logo", "Brand Colors" — not for the brand itself.)

## Logo variants

The guide defines four, all built on a hand-painted pink swagged curtain over
a gilt shield:

1. **Full Text Logo** — curtain + shield framing "LIZA'S LACE ATELIER", with
   "Curated By Brigitte Quinn" and the address beneath.
2. **Monogram Logo** — curtain + shield holding the L monogram, wordmark below.
3. **Alternate Small Logo** — compact pink shield with monogram, wordmark to
   the right.
4. **Monograms** — the L monogram alone, in a small and a large cut.

`painted-frame.jpg` in this folder is the curtain-and-shield frame on its
own, 2513x2737 (ratio 0.918), hand-painted watercolour.

**It is reference art, not a shipped asset.** It was briefly used directly
for the page-edge curtains and that failed on two counts:

1. **No alpha.** It is a JPEG, so the white around the painting is opaque.
   `mix-blend-mode: multiply` is the usual way to drop that, but the moment
   the element gets its own stacking context — a `z-index` is enough — the
   blend isolates and composites against its transparent parent instead of
   the page. White rectangles showed down both edges.
2. **One symmetrical painting, no side-panel cut.** Cropping a side drape
   out of it yielded a disconnected slice of swag hanging in mid-air with no
   rod above it, cut off hard at the bottom.

The curtains are now drawn in CSS instead — see
`src/components/CurtainDrapes/`. That costs no bytes, scales to any viewport
height, and has no white to remove.

If the painting itself is wanted on the site, the thing to ask Brigitte for
is **a PNG with real transparency**, and ideally a separate left-hand side
panel rather than the full symmetrical frame.

## Open conflicts

The palette question is settled — the site follows the guide.
One thing still differs from the guide, left alone deliberately:

**The mark.** The guide's logo is the curtain-and-shield. The site's header
mark is the pendant lamp (`public/new-logo-colored.png`), which the user
supplied separately and specifically asked to have dangling from the header,
with the Shop link seated inside its glass globe. The lamp appears nowhere in
the brand guide.

Also worth a decision at some point: the guide always sets the name as
**"Liza's Lace Atelier"**, and always credits "Curated By Brigitte Quinn".
The site uses "Liza's Lace" alone and credits nobody.

## Files in this folder

| File | What it is |
| --- | --- |
| `LizasLace_BrandGuide.pdf` | The guide itself — source of truth |
| `brand-guide.png` | A capture of the same page, easier to glance at |
| `painted-frame.jpg` | The curtain-and-shield painting, white background, no alpha |
| `curtain-frame-source.png` | The same curtain with a real alpha channel — the usable one |

Derived crops and processed copies are not kept here; they are regenerated
from these when needed, and the versions actually shipped live in `public/`.
