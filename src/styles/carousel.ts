import { css } from 'styled-components'

/**
 * The scroll-snap mechanics behind every swipeable set of photos on the site.
 * Layout — how wide the track is, what it becomes at larger sizes — belongs to
 * the component; only the gesture itself lives here, so the product page and
 * the grid card cannot drift apart on how a swipe feels.
 */
export const snapTrack = css`
  display: flex;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

/** One photo per viewport of the track. */
export const snapSlide = css`
  flex: 0 0 100%;
  scroll-snap-align: center;
`
