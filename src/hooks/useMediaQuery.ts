import { useEffect, useState } from 'react'

/**
 * Subscribes to a media query. Used where the *markup* has to differ between
 * breakpoints rather than just the styling — on desktop a product card opens
 * an inline panel, on mobile it navigates to the full product page.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export const DESKTOP_QUERY = '(min-width: 1024px)'
