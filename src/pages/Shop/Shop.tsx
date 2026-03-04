import { useState } from 'react'
import { useCollections } from '../../hooks/useCollections'
import { useShopProducts } from '../../hooks/useShopProducts'
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import {
  ShopSection,
  ShopHeader,
  ShopTitle,
  ShopSubtitle,
  FilterBar,
  FilterTab,
  ShopContent,
  LoadingMessage,
  ErrorMessage,
  EmptyMessage,
} from './Shop.styles'

export default function Shop() {
  const [activeHandle, setActiveHandle] = useState<string | undefined>(undefined)

  const { collections: allCollections } = useCollections()
  const collections = allCollections.filter(c => c.handle !== 'frontpage')
  const { products, isLoading, error } = useShopProducts(activeHandle)

  return (
    <ShopSection>
      <ShopHeader>
        <ShopTitle>The Collection</ShopTitle>
        <ShopSubtitle>Curated vintage wears — each piece one of a kind</ShopSubtitle>
      </ShopHeader>

      {collections.length > 0 && (
        <FilterBar>
          <FilterTab
            $active={activeHandle === undefined}
            onClick={() => setActiveHandle(undefined)}
          >
            All
          </FilterTab>
          {collections.map(col => (
            <FilterTab
              key={col.id}
              $active={activeHandle === col.handle}
              onClick={() => setActiveHandle(col.handle)}
            >
              {col.title}
            </FilterTab>
          ))}
        </FilterBar>
      )}

      <ShopContent>
        {isLoading && <LoadingMessage>Loading the collection…</LoadingMessage>}
        {error && <ErrorMessage>Unable to load products. Please try again later.</ErrorMessage>}
        {!isLoading && !error && products.length === 0 && (
          <EmptyMessage>No items available right now — check back soon.</EmptyMessage>
        )}
        {!isLoading && !error && products.length > 0 && (
          <ProductGrid products={products} />
        )}
      </ShopContent>
    </ShopSection>
  )
}
