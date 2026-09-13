import { useEffect, useState } from 'react'
import type { Collection } from '../types/shopify'
import { getCollections } from '../lib/shopify'

interface UseCollectionsResult {
  collections: Collection[]
  isLoading: boolean
  error: string | null
}

/**
 * `enabled` defers the request. The collections query probes each collection's
 * products to work out how many will actually render, which makes it the
 * heaviest read on the site — too expensive to fire on every page just so the
 * header's category menu is warm. The menu passes `false` until it is first
 * opened; the shop page, which always needs them, leaves it alone.
 */
export function useCollections(first = 30, enabled = true): UseCollectionsResult {
  const [collections, setCollections] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(enabled)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    setIsLoading(true)
    getCollections(first)
      .then(data => {
        if (!cancelled) {
          setCollections(data)
          setIsLoading(false)
        }
      })
      .catch(e => {
        if (!cancelled) {
          setError((e as Error).message)
          setIsLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [first, enabled])

  return { collections, isLoading, error }
}

/**
 * The collections worth showing: Shopify's default "frontpage" is an alias for
 * the whole catalogue, and a collection whose every product is still awaiting
 * photography would open onto an empty grid.
 */
export function shoppableCollections(collections: Collection[]): Collection[] {
  return collections.filter(c => c.handle !== 'frontpage' && c.renderableCount > 0)
}
