import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ProductSummary } from '../../types/shopify'
import { useCollections, shoppableCollections } from '../../hooks/useCollections'
import { useShopProducts } from '../../hooks/useShopProducts'
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import {
  ShopSection, Inner, ShopHeader, ShopTitle, ProductCount,
  ControlBar, FilterBar, FilterTab, RightControls, ToggleLabel, SortSelect,
  StateMessage, ErrorMessage,
} from './Shop.styles'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'title'

const SORT_LABELS: Record<SortKey, string> = {
  featured: 'Newest',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  title: 'Alphabetical',
}

function priceOf(product: ProductSummary): number {
  return parseFloat(product.priceRange.minVariantPrice.amount)
}

function sortProducts(products: ProductSummary[], sort: SortKey): ProductSummary[] {
  // The API already returns newest first, so "featured" needs no reordering.
  if (sort === 'featured') return products
  const copy = [...products]
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => priceOf(a) - priceOf(b))
    case 'price-desc':
      return copy.sort((a, b) => priceOf(b) - priceOf(a))
    case 'title':
      return copy.sort((a, b) => a.title.localeCompare(b.title))
  }
}

export default function Shop() {
  const [sort, setSort] = useState<SortKey>('featured')
  const [hideSoldOut, setHideSoldOut] = useState(false)

  /* The selected category lives in the URL rather than component state, so the
     header's category menu can link straight to it and a filtered listing can
     be shared or reached with the back button. */
  const [params, setParams] = useSearchParams()
  const activeHandle = params.get('collection') ?? undefined

  function selectCollection(handle?: string) {
    const next = new URLSearchParams(params)
    if (handle) next.set('collection', handle)
    else next.delete('collection')
    setParams(next)
  }

  const { collections: allCollections } = useCollections()
  const collections = shoppableCollections(allCollections)
  const { products, isLoading, error } = useShopProducts(activeHandle)

  const visible = useMemo(() => {
    const filtered = hideSoldOut ? products.filter(p => p.availableForSale) : products
    return sortProducts(filtered, sort)
  }, [products, sort, hideSoldOut])

  const activeTitle = collections.find(c => c.handle === activeHandle)?.title

  return (
    <ShopSection>
      <Inner>
        <ShopHeader>
          <ShopTitle>{activeTitle ?? 'The Collection'}</ShopTitle>
          {!isLoading && !error && (
            <ProductCount>
              {visible.length} {visible.length === 1 ? 'piece' : 'pieces'}
            </ProductCount>
          )}
        </ShopHeader>

        <ControlBar>
          <FilterBar>
            <FilterTab
              $active={activeHandle === undefined}
              onClick={() => selectCollection(undefined)}
            >
              All
            </FilterTab>
            {collections.map(col => (
              <FilterTab
                key={col.id}
                $active={activeHandle === col.handle}
                onClick={() => selectCollection(col.handle)}
              >
                {col.title}
              </FilterTab>
            ))}
          </FilterBar>

          <RightControls>
            <ToggleLabel>
              <input
                type="checkbox"
                checked={hideSoldOut}
                onChange={e => setHideSoldOut(e.target.checked)}
              />
              Available only
            </ToggleLabel>
            <SortSelect
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              aria-label="Sort products"
            >
              {(Object.keys(SORT_LABELS) as SortKey[]).map(key => (
                <option key={key} value={key}>{SORT_LABELS[key]}</option>
              ))}
            </SortSelect>
          </RightControls>
        </ControlBar>

        {isLoading && <StateMessage>Loading the collection…</StateMessage>}
        {error && <ErrorMessage>Unable to load products. Please try again later.</ErrorMessage>}
        {!isLoading && !error && visible.length === 0 && (
          <StateMessage>
            {hideSoldOut
              ? 'Everything here has found a home — uncheck “Available only” to browse the archive.'
              : 'No items available right now — check back soon.'}
          </StateMessage>
        )}
        {!isLoading && !error && visible.length > 0 && <ProductGrid products={visible} />}
      </Inner>
    </ShopSection>
  )
}
