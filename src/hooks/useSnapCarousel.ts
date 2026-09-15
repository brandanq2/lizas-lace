import { useCallback, useRef, useState } from 'react'

/**
 * Tracks which slide a scroll-snap track has settled on.
 *
 * The swipe itself is deliberately the browser's own: a scroll container gets
 * the gesture, its momentum and the snap right for free, keeps working with a
 * trackpad, a wheel and arrow keys, and never fights the platform the way a
 * touch-event handler does. This only reads the position back, so indicators
 * can follow it, and scrolls the track when one is clicked.
 *
 * Shared by the product page gallery and the grid card, which use the same
 * swipe on mobile but wrap it in different layouts.
 */
export function useSnapCarousel(count: number) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  /* Where the track has come to rest, as a slide number. Above the breakpoint
     where the track stops being a scroller this simply never fires. */
  const onScroll = useCallback(() => {
    const track = trackRef.current
    if (!track || !track.clientWidth) return
    const nearest = Math.round(track.scrollLeft / track.clientWidth)
    setIndex(Math.min(Math.max(nearest, 0), Math.max(count - 1, 0)))
  }, [count])

  const goTo = useCallback((target: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: target * track.clientWidth, behavior: 'smooth' })
  }, [])

  return { trackRef, index, onScroll, goTo }
}
