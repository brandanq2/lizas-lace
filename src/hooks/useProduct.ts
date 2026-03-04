import { useEffect, useState } from 'react'
import type { Product } from '../types/shopify'
import { getProduct } from '../lib/shopify'

interface UseProductResult {
  product: Product | null
  isLoading: boolean
  error: string | null
}

export function useProduct(handle: string): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!handle) return
    let cancelled = false
    setIsLoading(true)
    getProduct(handle)
      .then(data => {
        if (!cancelled) {
          setProduct(data)
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
  }, [handle])

  return { product, isLoading, error }
}
