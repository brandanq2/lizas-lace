import { useEffect, useState } from 'react'
import type { ProductSummary } from '../types/shopify'
import { getProducts } from '../lib/shopify'

interface UseShopProductsResult {
  products: ProductSummary[]
  isLoading: boolean
  error: string | null
}

/**
 * Every renderable product, in one read. Category filtering happens in memory
 * rather than server-side: the Storefront API can only narrow a product query
 * by collection, not by taxonomy category, and at this catalogue size one
 * paginated read beats a round trip per tab.
 */
export function useShopProducts(): UseShopProductsResult {
  const [products, setProducts] = useState<ProductSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)

    getProducts()
      .then(data => {
        if (!cancelled) {
          setProducts(data)
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
  }, [])

  return { products, isLoading, error }
}
