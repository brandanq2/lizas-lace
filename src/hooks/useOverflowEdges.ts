import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * Tracks whether a horizontal scroller has content hidden past either edge.
 *
 * A row that scrolls sideways on a touchscreen has nothing to say so: there
 * is no scrollbar, and a chip clipped flush to the screen edge reads as a
 * chip that happens to end there. Fading the overflowing edge is the hint —
 * which means knowing, per edge, whether anything is actually hidden, so a
 * row that fits shows no fade at all.
 */
export function useOverflowEdges() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ atStart: true, atEnd: true })

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    const atStart = track.scrollLeft <= 1
    /* Fractional layout leaves a sub-pixel remainder at the far end, so the
       comparison needs the same tolerance or the fade never clears. */
    const atEnd = track.scrollLeft >= max - 1
    setEdges(prev =>
      prev.atStart === atStart && prev.atEnd === atEnd ? prev : { atStart, atEnd }
    )
  }, [])

  /* Re-measured after every render, which is what catches a change of
     contents: products arrive after the first paint, and picking a category
     swaps the whole row underneath us. The bail-out above keeps that from
     looping. */
  useLayoutEffect(measure)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    return () => observer.disconnect()
  }, [measure])

  return { trackRef, onScroll: measure, ...edges }
}
