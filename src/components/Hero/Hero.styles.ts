import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { HERO_ASPECT } from './heroImages'

/**
 * The hero, top to bottom: the brand name split around the pendant fixture
 * that hangs out of the header, then a full-bleed grid of photographs, then
 * the tagline and the Shop Now button.
 *
 * The grid sits in normal flow below the header, while the wordmark is
 * positioned up into the header's own height so it can line up with the
 * fixture's glass globe.
 *
 * The curtains are set aside for now. The artwork was tried as a full-page
 * fixed backdrop and as a frame around this hero, and its colours as a shaped
 * banner and side bands; none of it stuck. The painting and the crops are
 * kept in docs/brand/ for when it comes back.
 */

/* Where the fixture's globe centres, as a fraction of the rendered mark. Taken
   from public/shop-light-fixture.png: the glass spans 0.5677..0.9688 of the
   image height, so its midpoint is 0.7683. The wordmark aligns to this, which
   is why it tracks markHeight rather than being a fixed offset. */
const GLOBE_CENTRE = 0.7683

/* The fixture's artwork is a fixed 2:3, so its rendered width is two thirds of
   the mark's box. The wordmark's centre gap clears that plus breathing room. */
const fixtureWidth = (heightToken: string, insetToken: string) =>
  `calc((${heightToken} - ${insetToken} * 2) * 2 / 3)`

const globeCentreY = (heightToken: string, insetToken: string) =>
  `calc(${insetToken} + ${GLOBE_CENTRE} * (${heightToken} - ${insetToken} * 2))`

export const Section = styled.section`
  position: relative;
  /* Reserves the header's band, which the fixture hangs into and the wordmark
     is positioned up inside. Everything after this is in normal flow. */
  padding-top: ${({ theme }) => theme.layout.markHeightMobile};

  @media (min-width: 768px) {
    padding-top: ${({ theme }) => theme.layout.markHeight};
  }
`

/**
 * The wordmark, anchored so its centre line lands on the fixture's globe. The
 * gap between the two halves is the fixture's own width plus margin, so the
 * lamp hangs in the space rather than over the type.
 */
export const Wordmark = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: ${({ theme }) =>
    globeCentreY(theme.layout.markHeightMobile, theme.layout.markInset)};
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) =>
    `calc(${fixtureWidth(theme.layout.markHeightMobile, theme.layout.markInset)} + 1.5rem)`};

  @media (min-width: 768px) {
    top: ${({ theme }) =>
      globeCentreY(theme.layout.markHeight, theme.layout.markInset)};
    gap: ${({ theme }) =>
      `calc(${fixtureWidth(theme.layout.markHeight, theme.layout.markInset)} + 3rem)`};
  }
`

export const WordmarkHalf = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.75rem, 4.4vw, 3.5rem);
  /* The family ships a single weight; 500+ would render as a faux-bold. */
  font-weight: 400;
  line-height: 1.05;
  margin: 0;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.ink};
`

/**
 * The photo grid — 2x2, full bleed.
 *
 * Nothing between here and the viewport sets a max-width (PageWrapper and
 * Main are both unconstrained), so width: 100% is already the full window.
 * Deliberately 100% rather than 100vw: vw includes the scrollbar and would
 * push a horizontal overflow.
 *
 * Cells carry the photos' own aspect, so the Polaroid borders are never
 * cropped — but with two portrait cells per row that couples width to height
 * hard. Strictly edge-to-edge on a 2460px window each cell is 1230px wide and
 * therefore 1496px tall, making the grid 2993px — over two screens for four
 * photos. So the grid runs edge to edge until a row would exceed
 * MAX_ROW_HEIGHT, then caps and centres. On phones and tablets the cap never
 * engages and it is genuinely full bleed.
 *
 * Raise MAX_ROW_HEIGHT to push the cap out; remove the max-width entirely for
 * strict edge-to-edge at any size.
 */
const MAX_ROW_HEIGHT = '52vh'

export const PhotoGrid = styled.div`
  width: 100%;
  max-width: calc(${MAX_ROW_HEIGHT} * ${HERO_ASPECT} * 2);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
`

export const PhotoCell = styled.div`
  position: relative;
  aspect-ratio: ${HERO_ASPECT};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.tint};
`

export const Photo = styled.img<{ $position?: string }>`
  width: 100%;
  height: 100%;
  display: block;
  /* The cells match the photos' aspect, so cover is a no-op for these four
     and only bites if a differently-shaped photo is added later — at which
     point cropping beats distorting. */
  object-fit: cover;
  object-position: ${({ $position }) => $position ?? 'center'};
`

/* Tagline and button, beneath the grid. Padded, unlike the grid itself. */
export const Below = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 2rem 1.5rem 3.5rem;
  text-align: center;

  @media (min-width: 768px) {
    padding: 2.5rem 2rem 4.5rem;
  }
`

export const Tagline = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};

  @media (min-width: 768px) {
    font-size: 0.6875rem;
  }
`

export const ShopNow = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.paper};
  background: ${({ theme }) => theme.colors.ink};
  padding: 0.8125rem 2rem;
  transition: background-color 250ms ease, color 250ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.pink};
    color: ${({ theme }) => theme.colors.ink};
  }
`
