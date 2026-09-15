# Fonts

## JP Millie June — brand serif ✅ in use

Self-hosted from `src/assets/fonts/`, declared with `@font-face` in
`src/styles/GlobalStyle.ts`, exposed as `theme.fonts.display`.

- Regular + Italic, TrueType outlines, ~76 KB and ~83 KB
- `fsType 0` (Installable Embedding) — web embedding is permitted
- Covers A–Z, a–z, 0–9, punctuation, curly quotes, en/em dashes, accents
- **Single weight only** (`usWeightClass 400`). Anything that asks for 500+
  gets a browser-synthesised faux-bold, so every rule using
  `theme.fonts.display` must also set `font-weight: 400`.

Currently applied to: hero wordmark, shop page title, Visit section heading,
footer wordmark. Product titles deliberately stayed on the interface sans
— they run long and repeat down the grid — but they are a one-line change if
you want them on the serif too.

The supplied `.otf` files are byte-for-byte TrueType (`sfnt 0x00010000`, not
`OTTO`), so the `.ttf` versions were used and the `.otf` duplicates skipped.

## Avenir — brand sans ❌ NOT installed

The brand guide (`docs/brand/`) confirms the intended sans: its own embedded
fonts are `JPMillieJune`, `Avenir-Book` and `GillSans`, and the type page
names **Millie June** and **Avenir**. So Avenir Book is the target weight.

`Avenir.ttc` was supplied but cannot be used on the site as-is, for two
independent reasons:

1. **Format.** It is a TrueType *Collection* holding 12 faces (Light, Book,
   Roman, Medium, Heavy, Black, each plus an Oblique). No browser can load a
   `.ttc` via `@font-face`; each face has to be a separate file.
2. **Licence.** Every face reports `fsType 4` — *Preview & Print embedding
   only*. That permission bit explicitly does not cover web embedding. This
   is the macOS system copy of Avenir, which is licensed for local use on the
   machine, not for serving to visitors.

Extracting the faces from the `.ttc` is straightforward and can be done on
request — but doing so would not change the licensing position, so it has
been left alone.

`theme.fonts.sans` is **Archivo** as a stand-in.

### Options

1. **Buy an Avenir webfont licence** from Monotype / Linotype. They supply
   `.woff2` files plus a domain-scoped licence. Drop them in
   `src/assets/fonts/`, add `@font-face` blocks alongside JP Millie June, and
   point `theme.fonts.sans` at the family. This is the only route that gets
   the real Avenir.
2. **Use a free geometric-humanist stand-in.** Archivo is currently in place
   but it is a *neo-grotesque*, so it reads noticeably different from Avenir.
   Closer open alternatives, all on Google Fonts:
   - **Nunito Sans** — humanist, round, the usual Avenir substitute
   - **Mulish** — geometric with similar proportions
   - **Hanken Grotesk** — close on both width and terminals
   - **Jost** — more strictly geometric, Futura-leaning

Swapping is one line in `src/styles/theme.ts` plus the Google Fonts link in
`index.html`.

## Optional: smaller files

The brand serif ships as TrueType. Converting to `woff2` would cut roughly
half the bytes, but needs a build-time tool (`fonttools`/`woff2_compress`)
that is not currently in this project. Vercel already compresses static
assets on the wire, so the practical saving is small.
