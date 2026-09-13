import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

/**
 * The header, as tall as the whole pendant mark so the fixture is fully
 * contained and can never overhang page content.
 *
 * Transparent, with no background of its own — the curtain colours that were
 * briefly here are gone, along with the side bands. The fixture hangs down out
 * of this band into the hero, where the brand name splits either side of it.
 *
 * The curtain is deliberately *not* here. It was briefly a full-width pink
 * valance across this bar; the painted curtain now frames the hero instead,
 * starting just below this header so the fixture hangs above it rather than
 * across its swag. See components/Hero.
 *
 * Always opaque, so there is no transparent-over-hero state and the nav links
 * are unconditionally ink.
 */
export const Nav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* Above the curtain cloth (60) so the Cart link and the fixture are never
     buried under it; below the cart drawer (100). */
  z-index: 70;
  height: ${({ theme }) => theme.layout.markHeightMobile};
  overflow: visible;
  /* Nothing in the header is interactive except the links and the mark, which
     opt back in individually. Important now the header is transparent: a
     click-catching band across the top of the page would be invisible. */
  pointer-events: none;

  @media (min-width: 768px) {
    height: ${({ theme }) => theme.layout.markHeight};
  }
`

/* The top band holding the links — the "ceiling" the fixture hangs from. It
   carries no background of its own; the header behind it supplies the single
   continuous white field. */
/**
 * The band holding the links. Transparent at rest so the hero reads straight
 * through to the top of the page; once the page moves, content starts passing
 * underneath the links, so a frosted panel fades in across this band only —
 * translucent, so it never reads as a solid white bar.
 */
export const Bar = styled.div<{ $lifted: boolean }>`
  position: relative;
  z-index: 1;
  height: ${({ theme }) => theme.layout.navHeightMobile};
  transition: background-color 350ms ease, backdrop-filter 350ms ease,
    box-shadow 350ms ease;

  ${({ $lifted, theme }) =>
    $lifted
      ? `
        background-color: ${theme.colors.paper}E6;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 24px -14px ${theme.colors.ink}47;
      `
      : `
        background-color: transparent;
        backdrop-filter: none;
        box-shadow: none;
      `}
  /* Inert like the header — the individual controls opt in. Otherwise this
     band would silently eat clicks across the whole top of the page. */
  pointer-events: none;

  @media (min-width: 768px) {
    height: ${({ theme }) => theme.layout.navHeight};
  }
`

export const NavInner = styled.div`
  position: relative;
  overflow: visible;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 1.25rem;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  @media (min-width: 768px) {
    padding: 0 2.5rem;
  }
`

/**
 * Home, top left of the header. Sits directly in the grid rather than inside
 * a NavGroup — on mobile a wrapper would be an empty box in the same cell as
 * the hamburger, swallowing its clicks. Hidden below 768px, where the
 * hamburger menu carries Home instead.
 */
export const HomeLink = styled(NavLink)`
  display: none;

  @media (min-width: 768px) {
    display: block;
    grid-column: 1;
    grid-row: 1;
    justify-self: start;
    pointer-events: auto;
    position: relative;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.ink};
    transition: opacity 200ms ease;

    &:hover {
      opacity: 0.6;
    }

    /* Marks the current page, matching how the shop's filter tabs read. */
    &.active::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -5px;
      height: 1px;
      background: currentColor;
    }
  }
`

/* Desktop nav groups — hidden on mobile */
/* The right-hand group holds the cart at every size — there is no separate
   mobile cart any more, which also drops a duplicate "Cart" control out of
   the accessibility tree. */
export const NavGroup = styled.div<{ $right?: boolean }>`
  display: flex;
  gap: 2rem;
  align-items: center;
  grid-column: ${({ $right }) => ($right ? '3' : '1')};
  justify-content: ${({ $right }) => ($right ? 'flex-end' : 'flex-start')};
`

/* Brand mark — the pendant lamp hangs from the top of the header as though it
   were a ceiling: the plaster medallion sits at the top of its box, and the
   cord and globe drop into the field below. The globe carries the word "Shop"
   in the artwork and is a link; see GlobeShopLink.

   public/shop-light-fixture.png is a processed copy. The file as supplied had
   no alpha channel and a transparency checkerboard painted into its pixels,
   so the board was flood filled away from the borders and the result
   downscaled 2x. */
export const BrandSlot = styled.div`
  grid-column: 2;
  grid-row: 1;
  position: relative;
  justify-self: center;
  align-self: stretch;
  /* Wide enough that the 2:3 mark is constrained by its height, not its
     width — otherwise object-fit: contain shrinks it and the medallion
     lifts away from the band. Must stay above
     (markHeight - markInset * 2) * 2 / 3. */
  width: 6.5rem;

  @media (min-width: 768px) {
    width: 11rem;
  }
`

/* The link is only as tall as the link band, so the dangling part of the
   fixture never swallows clicks meant for the page. */
export const BrandRouterLink = styled(NavLink)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  display: block;
  line-height: 0;
  pointer-events: auto;
`

/* The image is taller than its link and overflows downward into the white
   field. `pointer-events: none` keeps that overhang purely decorative. */
export const BrandMark = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  /* Inset from both header edges: dropped by markInset and shortened by twice
     it, so the fixture floats clear of the top and bottom rather than sitting
     flush against them. */
  top: ${({ theme }) => theme.layout.markInset};
  height: calc(
    ${({ theme }) => theme.layout.markHeightMobile} -
      ${({ theme }) => theme.layout.markInset} * 2
  );
  object-fit: contain;
  /* Pins the medallion to the top of its box as that box scales. */
  object-position: top center;
  pointer-events: none;
  /* Grounds the fixture against the near-white header. */
  filter: drop-shadow(0 9px 16px rgba(35, 31, 32, 0.2));

  @media (min-width: 768px) {
    height: calc(
      ${({ theme }) => theme.layout.markHeight} -
        ${({ theme }) => theme.layout.markInset} * 2
    );
  }
`

/* The globe's box within the rendered mark, measured off the alpha channel of
   public/shop-light-fixture.png: the glass begins at 0.5677 of the image
   height, the artwork ends at 0.9688, and the widest row is 0.5820 of the
   image width. Width is expressed against the mark's height because the
   artwork is a fixed 2:3, so image width = height * 2/3. */
const GLOBE_TOP = 0.5677
const GLOBE_HEIGHT = 0.9688 - 0.5677
const GLOBE_WIDTH = 0.582 * (2 / 3)

/**
 * The Shop link — the glass globe itself.
 *
 * "Shop" is painted into the artwork now, so this is a bare hit area laid over
 * the globe rather than type superimposed on it. That removes the whole
 * legibility problem the old overlay had: ink read 11.6:1 on the globe's cream
 * but only 1.23:1 where a letter crossed a green stripe, which needed a glow
 * behind it to survive.
 *
 * Circular to match the glass, and carrying visually hidden text so the link
 * still has an accessible name. Unlike the old overlay this works at every
 * breakpoint — there is no type to shrink, and even at the mobile mark the
 * target is about 50x51px, comfortably past the 44px minimum.
 */
export const GlobeShopButton = styled.button`
  position: absolute;
  left: 50%;
  background: none;
  border: none;
  padding: 0;
  top: calc(
    ${({ theme }) => theme.layout.markInset} + ${GLOBE_TOP} *
      (${({ theme }) => theme.layout.markHeightMobile} -
        ${({ theme }) => theme.layout.markInset} * 2)
  );
  width: calc(
    ${GLOBE_WIDTH} * (${({ theme }) => theme.layout.markHeightMobile} -
      ${({ theme }) => theme.layout.markInset} * 2)
  );
  height: calc(
    ${GLOBE_HEIGHT} * (${({ theme }) => theme.layout.markHeightMobile} -
      ${({ theme }) => theme.layout.markInset} * 2)
  );
  transform: translateX(-50%);
  border-radius: 50%;
  pointer-events: auto;
  cursor: pointer;
  z-index: 2;
  /* The bulb warms up on hover — the only affordance available now that the
     label is part of the image and cannot be restyled. */
  transition: box-shadow 250ms ease;

  &:hover,
  &:focus-visible {
    box-shadow: 0 0 26px 6px ${({ theme }) => theme.colors.pink}4D;
    outline: none;
  }

  @media (min-width: 768px) {
    top: calc(
      ${({ theme }) => theme.layout.markInset} + ${GLOBE_TOP} *
        (${({ theme }) => theme.layout.markHeight} -
          ${({ theme }) => theme.layout.markInset} * 2)
    );
    width: calc(
      ${GLOBE_WIDTH} * (${({ theme }) => theme.layout.markHeight} -
        ${({ theme }) => theme.layout.markInset} * 2)
    );
    height: calc(
      ${GLOBE_HEIGHT} * (${({ theme }) => theme.layout.markHeight} -
        ${({ theme }) => theme.layout.markInset} * 2)
    );
  }
`

export const BrandFallback = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
`

/**
 * The cart control: the cat above the label CA(R)T. The pun only lands if the
 * cat sits directly over the word, so this is a vertical stack rather than the
 * usual icon-beside-text.
 */
export const CartButton = styled.button`
  position: relative;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1875rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.ink};
  transition: opacity 200ms ease;

  &:hover {
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors.ink};
    outline-offset: 4px;
  }
`

/* Anchors the count badge to the cat rather than to the whole stack. */
export const CatWrap = styled.span`
  position: relative;
  display: block;
  line-height: 0;
`

export const CatIcon = styled.img`
  display: block;
  width: 2.25rem;
  height: auto;

  @media (min-width: 768px) {
    width: 3rem;
  }
`

export const CartLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 0.8125rem;
    letter-spacing: 0.16em;
  }
`

export const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -7px;
  background: ${({ theme }) => theme.colors.pinkDeep};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0;
  min-width: 1.0625rem;
  height: 1.0625rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  pointer-events: none;
`

/* Mobile-only controls */
export const MobileLeft = styled.div`
  grid-column: 1;
  grid-row: 1;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    display: none;
  }
`

export const IconButton = styled.button`
  position: relative;
  pointer-events: auto;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  color: ${({ theme }) => theme.colors.ink};
`

export const HamburgerBar = styled.span<{ $open: boolean; $pos: 'top' | 'mid' | 'bot' }>`
  display: block;
  width: 20px;
  height: 1.5px;
  background: currentColor;
  transition: transform 300ms, opacity 300ms;

  ${({ $open, $pos }) =>
    $open &&
    $pos === 'top' &&
    css`transform: translateY(6.5px) rotate(45deg);`}

  ${({ $open, $pos }) =>
    $open && $pos === 'mid' && css`opacity: 0;`}

  ${({ $open, $pos }) =>
    $open &&
    $pos === 'bot' &&
    css`transform: translateY(-6.5px) rotate(-45deg);`}
`

export const MobileMenu = styled.div<{ $open: boolean }>`
  /* The pendant mark is absolutely positioned and would otherwise paint on
     top of the open menu, so the panel is lifted above it. */
  position: relative;
  z-index: 2;
  pointer-events: auto;
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? '320px' : '0')};
  transition: max-height 350ms ease;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.paper};
  border-top: 1px solid ${({ theme }) => theme.colors.line};

  @media (min-width: 768px) {
    display: none;
  }
`

export const MobileNavLink = styled(NavLink)`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  text-decoration: none;
  text-align: center;
  padding: 1.125rem 1.5rem;
  transition: background-color 200ms;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  &:last-child {
    border-bottom: none;
  }

  &:hover,
  &.active {
    background-color: ${({ theme }) => theme.colors.cream};
  }
`

/* Bottom of the glass, where the category menu hangs from. */
const globeBottom = (heightToken: string, insetToken: string) =>
  `calc(${insetToken} + ${GLOBE_TOP + GLOBE_HEIGHT} * (${heightToken} - ${insetToken} * 2))`

/**
 * The category menu, dropping out of the bottom of the glass globe. Wider than
 * the mark's slot, so it is centred on the globe and allowed to overflow —
 * nothing in the header clips, which the dangling fixture already relies on.
 */
export const ShopMenu = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(${({ theme }) => globeBottom(theme.layout.markHeightMobile, theme.layout.markInset)} + 0.5rem);
  z-index: 3;
  pointer-events: auto;
  min-width: 12rem;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.line};
  box-shadow: 0 14px 34px -18px ${({ theme }) => theme.colors.ink}59;

  @media (min-width: 768px) {
    top: calc(${({ theme }) => globeBottom(theme.layout.markHeight, theme.layout.markInset)} + 0.5rem);
  }
`

export const ShopMenuItem = styled(NavLink)`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.ink};
  padding: 0.8125rem 1.25rem;
  text-align: center;
  transition: background-color 200ms ease;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.line};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.cream};
  }
`

export const ShopMenuNote = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.muted};
  padding: 0.8125rem 1.25rem;
  text-align: center;
`
