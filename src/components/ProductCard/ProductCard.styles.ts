import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { snapTrack, snapSlide } from '../../styles/carousel'

/**
 * The grid cell. The card's clickable element used to wrap the photo as well,
 * but the carousel arrows have to be real buttons and a button cannot nest
 * inside a button or an anchor — so the photo and the body are now two
 * separate controls sitting inside this shell, which owns the hover state
 * they used to share.
 */
export const CardShell = styled.div`
  display: flex;
  flex-direction: column;
`

/* The card is a button on desktop (opens the inline panel) and a link on
   mobile (goes straight to the product page), so the shared visual styles
   live in a mixin applied to both. */
const cardBase = css`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  padding: 0;
  background: none;
  border: none;
  font: inherit;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  appearance: none;

  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors.ink};
    outline-offset: 4px;
  }
`

export const CardButton = styled.button<{ $expanded: boolean }>`
  ${cardBase}
`

export const CardLink = styled(Link)`
  ${cardBase}
`

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  background-color: ${({ theme }) => theme.colors.tint};
  overflow: hidden;
`

/**
 * Covers the photo and carries the same action as the body control. Kept out
 * of the tab order and hidden from assistive tech: the body control already
 * exposes the product's name and destination, so a second stop here would
 * just be a duplicate with no label of its own.
 */
const mediaActionBase = css`
  position: absolute;
  inset: 0;
  z-index: 1;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  appearance: none;
`

export const MediaAction = styled.button`
  ${mediaActionBase}
`

export const MediaActionLink = styled(Link)`
  ${mediaActionBase}
`

/**
 * The mobile card's photos: the same swipe the product page uses, so the two
 * behave identically on a touchscreen. Only rendered below the desktop
 * breakpoint, where the arrows take over instead.
 */
export const CardTrack = styled.div`
  ${snapTrack}
  position: absolute;
  inset: 0;
`

/**
 * Each photo is also the link to the product. A swipe that starts on an
 * anchor still scrolls the track, and the browser cancels the click once the
 * gesture turns into a scroll — so one element can carry both without a
 * transparent overlay stealing the gesture.
 */
export const CardSlide = styled(Link)`
  ${snapSlide}
  position: relative;
  display: block;
  height: 100%;
`

/**
 * Position indicator, laid over the photo rather than under it so a card
 * never changes height as the grid fills in. Deliberately not interactive:
 * at this size a tap target would eat the swipe area it is advertising.
 */
export const CardDots = styled.div`
  position: absolute;
  bottom: 0.625rem;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  gap: 0.3125rem;
  pointer-events: none;
`

export const CardDot = styled.span<{ $active: boolean }>`
  width: 0.3125rem;
  height: 0.3125rem;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? '#FEFDFE' : 'rgba(254, 253, 254, 0.5)')};
  box-shadow: 0 0 0.1875rem rgba(35, 31, 32, 0.4);
  transition: background-color 200ms ease;
`

/** Previous/next photo. Sits above MediaAction so taps reach it first. */
export const CarouselArrow = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => $side}: 0.5rem;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.875rem;
  height: 1.875rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: rgba(254, 253, 254, 0.88);
  color: ${({ theme }) => theme.colors.ink};
  box-shadow: 0 0.125rem 0.5rem rgba(35, 31, 32, 0.16);
  transition: opacity 200ms ease, background-color 200ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.white};
  }

  svg {
    width: 0.6875rem;
    height: 0.6875rem;
  }

  /* On a touchscreen there is no hover to reveal them, so they stay put.
     Where a pointer exists they fade in with the card. */
  @media (hover: hover) {
    opacity: 0;

    ${CardShell}:hover &,
    &:focus-visible {
      opacity: 1;
    }
  }
`

export const ProductImage = styled.img<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 500ms ease;
`

/* Empty state — a large part of this catalogue has no photography yet, so
   the placeholder is designed to look deliberate rather than broken. */
export const NoImage = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.tint};
`

export const NoImageMark = styled.img`
  width: 2.25rem;
  opacity: 0.28;
`

export const NoImageText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted}AA;
`

export const ImageBadge = styled.span`
  position: absolute;
  right: 0;
  bottom: 0.75rem;
  background: ${({ theme }) => theme.colors.paper};
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.375rem 0.75rem;
`

export const ImageCount = styled.span<{ $alwaysVisible: boolean }>`
  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
  z-index: 2;
  background: rgba(255, 253, 249, 0.9);
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.6875rem;
  font-variant-numeric: tabular-nums;
  padding: 0.125rem 0.4375rem;
  opacity: ${({ $alwaysVisible }) => ($alwaysVisible ? 1 : 0)};
  transition: opacity 200ms ease;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  padding: 0.875rem 0 0;
`

export const ProductTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ink};
  line-height: 1.35;
  margin: 0;
`

export const ProductPrice = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
`

export const ComparePrice = styled.span`
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.muted};
  text-decoration: line-through;
`

export const SizeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.125rem;
`

export const SizeChip = styled.span<{ $available: boolean }>`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  color: ${({ theme, $available }) =>
    $available ? theme.colors.muted : `${theme.colors.muted}77`};
  text-decoration: ${({ $available }) => ($available ? 'none' : 'line-through')};
`

export const ExpandHint = styled.span<{ $expanded: boolean }>`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    margin-top: 0.25rem;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted};
    opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
    transition: opacity 200ms ease;

    ${CardShell}:hover & {
      opacity: 1;
    }
  }
`
