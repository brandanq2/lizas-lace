import { useEffect, useState } from 'react'
import type { Product } from '../types/shopify'
import { getProducts } from '../lib/shopify'

interface UseProductsResult {
  products: Product[]
  isLoading: boolean
  error: string | null
}

export function useProducts(first = 24): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    getProducts(first)
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
  }, [first])

  return { products, isLoading, error }
}
