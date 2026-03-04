import { useEffect, useState } from 'react'
import type { Product } from '../types/shopify'
import { getProducts, getCollectionProducts } from '../lib/shopify'

interface UseShopProductsResult {
  products: Product[]
  isLoading: boolean
  error: string | null
}

export function useShopProducts(collectionHandle?: string): UseShopProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)

    const fetch = collectionHandle
      ? getCollectionProducts(collectionHandle)
      : getProducts()

    fetch
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
  }, [collectionHandle])

  return { products, isLoading, error }
}
