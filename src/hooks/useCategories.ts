import { useEffect, useMemo, useState } from 'react'
import type { CategoryFacet } from '../types/shopify'
import { getCategoryFacets } from '../lib/shopify'
import { buildCategories, PRIMARY_DEPTH, type CategoryFilter } from '../lib/categories'

interface UseCategoriesResult {
  categories: CategoryFilter[]
  isLoading: boolean
  error: string | null
}

/**
 * The primary category list, derived from live catalogue data on every load so
 * a category appears the moment Brigitte photographs something in it and
 * disappears when the last piece sells.
 *
 * `enabled` defers the request: the header's category menu passes `false`
 * until it is first opened, so browsing a product page costs nothing. The shop
 * page builds its own list from the products it has already fetched.
 */
export function useCategories(enabled = true): UseCategoriesResult {
  const [facets, setFacets] = useState<CategoryFacet[]>([])
  const [isLoading, setIsLoading] = useState(enabled)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    setIsLoading(true)
    getCategoryFacets()
      .then(data => {
        if (!cancelled) {
          setFacets(data)
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
  }, [enabled])

  const categories = useMemo(
    () => buildCategories(facets, PRIMARY_DEPTH),
    [facets]
  )

  return { categories, isLoading, error }
}
