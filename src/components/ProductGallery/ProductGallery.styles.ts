import styled from 'styled-components'
import { snapTrack, snapSlide } from '../../styles/carousel'

export const Gallery = styled.div`
  position: relative;
`

/**
 * One photo at a time at every size: swiped on a touchscreen, driven by the
 * arrows on a pointer. It used to become a two-column grid above 640px, which
 * meant the page grew a column of thumbnails-that-were-not-thumbnails and no
 * single photo was ever shown large.
 *
 * The swipe is deliberately the browser's own. A scroll container gets the
 * gesture, the momentum and the snap right for free, keeps working with a
 * trackpad, a mouse wheel and arrow keys, and never fights the platform the
 * way a touch-event handler does.
 */
export const Track = styled.div`
  ${snapTrack}
  /* Full-bleed past the page gutter, so one photo fills the screen edge to
     edge rather than sitting in a column. Must stay equal to Inner's mobile
     side padding in Product.styles.ts — too small leaves a seam, too large
     makes the page scroll sideways. */
  margin: 0 -1.25rem;

  @media (min-width: 640px) {
    margin: 0;
  }
`

/**
 * Previous/next photo. A pointer gets these; a touchscreen gets the swipe and
 * the dots instead, so they stay hidden at the sizes where the gesture is the
 * natural way through. Clamped rather than wrapping: smooth-scrolling a snap
 * track from the last photo back to the first races past everything between.
 */
export const GalleryArrow = styled.button<{ $side: 'left' | 'right' }>`
  display: none;

  @media (min-width: 640px) {
    position: absolute;
    top: 50%;
    ${({ $side }) => $side}: 0.75rem;
    transform: translateY(-50%);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.375rem;
    height: 2.375rem;
    padding: 0;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background: rgba(254, 253, 254, 0.9);
    color: ${({ theme }) => theme.colors.ink};
    box-shadow: 0 0.125rem 0.625rem rgba(35, 31, 32, 0.18);
    transition: background-color 200ms ease, opacity 200ms ease;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.white};
    }

    &:disabled {
      opacity: 0.3;
      cursor: default;
    }

    svg {
      width: 0.8125rem;
      height: 0.8125rem;
    }
  }
`

export const Slide = styled.div`
  position: relative;
  ${snapSlide}
  aspect-ratio: 3 / 4;
  background: ${({ theme }) => theme.colors.tint};
  overflow: hidden;
`

export const SlideImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Counter = styled.span`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  background: rgba(254, 253, 254, 0.9);
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.6875rem;
  font-variant-numeric: tabular-nums;
  padding: 0.1875rem 0.5rem;
`

export const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.4375rem;
  margin-top: 0.875rem;
`

export const Dot = styled.button<{ $active: boolean }>`
  width: 0.4375rem;
  height: 0.4375rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: ${({ theme, $active }) => ($active ? theme.colors.ink : theme.colors.line)};
  transition: background-color 200ms ease;

  /* The dot itself stays small, but the tap target does not. */
  position: relative;
  &::after {
    content: '';
    position: absolute;
    inset: -0.5rem;
  }
`

export const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.tint};
`

export const PlaceholderMark = styled.img`
  width: 4rem;
  opacity: 0.28;
`

export const PlaceholderText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted}AA;
`
