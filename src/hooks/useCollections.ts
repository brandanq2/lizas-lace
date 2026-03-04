import { useEffect, useState } from 'react'
import type { Collection } from '../types/shopify'
import { getCollections } from '../lib/shopify'

interface UseCollectionsResult {
  collections: Collection[]
  isLoading: boolean
  error: string | null
}

export function useCollections(first = 30): UseCollectionsResult {
  const [collections, setCollections] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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
  }, [first])

  return { collections, isLoading, error }
}
