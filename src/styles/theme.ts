export const theme = {
  colors: {
    /* Brand — from Brigitte's brand guide, see docs/brand/README.md.
       The guide defines exactly two colours, both sampled from its own
       swatches: pink #C07188 and near-black #231F20. Everything else here is
       derived, with the hue locked to the pink (342.5deg) so the neutrals
       stay warm rather than going grey. */
    pink: '#C07188',      // the brand pink, verbatim
    pinkDeep: '#9A425B',  // small pink text and button hovers; pink is too
                          // light to carry 12px text at AA
    pinkSoft: '#E9D8DD',  // pale tint: hairlines, and type on near-black
    cream: '#F9F3F5',     // warm section background
    creamLight: '#FDFBFB',
    white: '#ffffff',

    paper: '#FEFDFE',   // page background
    ink: '#231F20',     // body copy — the guide's near-black, verbatim
    display: '#231F20', // headings and nav; the guide has no separate tone
    muted: '#77696D',   // secondary copy. Darkened until it clears 4.5:1 on
                        // tint, the tightest ground it sits on
    line: '#EAE1E4',    // hairline rules and input borders
    tint: '#F6F1F2',    // image tiles and empty states
  },
  fonts: {
    /* Interface: nav, labels, cards, buttons, body copy.
       Brigitte's brand sans is Avenir, which cannot be self-hosted — see
       FONTS.md. Archivo stands in until a licensed webfont is available. */
    sans: 'Archivo, "Helvetica Neue", Arial, sans-serif',
    /* Brand serif, self-hosted and declared in GlobalStyle. Single weight,
       so anything using it must stay at font-weight 400. */
    display: '"JP Millie June", Georgia, serif',
  },
  layout: {
    /* Height of the solid white bar only. Kept short so the fixture reads as
       dangling out of a slim header rather than out of a tall block. */
    /* Sized to the cart control, which is the tallest thing in the band:
       the cat plus its label needs ~60px at desktop scale. */
    navHeight: '4.5rem',
    navHeightMobile: '3.75rem',
    /* Total height of the hanging lamp mark. It is taller than the bar and
       overhangs below it, so pages clear this rather than the bar height.
       The plaster medallion takes roughly the top quarter and stays inside
       the bar; the glass globe hangs free below it.

       Do not drop below 10rem: the Shop link is seated inside the globe, and
       the globe is only ~36% as wide as the mark is tall. Any smaller and the
       label cannot reach 11px without spilling past the curve.

       Raising this also requires widening BrandSlot, or object-fit: contain
       starts constraining the mark by width instead of height, which shrinks
       it and lifts the medallion off the top. */
    markHeight: '17rem',
    markHeightMobile: '10rem',
    /* Breathing room between the fixture and the header's top and bottom
       edges. Taken out of the mark's box on both sides, so raising it insets
       the fixture rather than growing the header. */
    markInset: '0.5rem',
    maxWidth: '86rem',
  },
}

export type Theme = typeof theme
