import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ProductSummary } from '../../types/shopify'
import { useShopProducts } from '../../hooks/useShopProducts'
import {
  buildCategories, isInCategory, PRIMARY_DEPTH, SECONDARY_DEPTH,
  type CategoryFilter,
} from '../../lib/categories'
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import {
  ShopSection, Inner, ShopHeader, ShopTitle, ProductCount,
  ControlBar, FilterBar, FilterGroup, FilterTab, TabCaret,
  SubMenu, SubMenuPanel, SubMenuItem, SubFilterBar, SubFilterTab,
  RightControls, SortSelect,
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

  /* The selected category lives in the URL rather than component state, so the
     header's category menu can link straight to it and a filtered listing can
     be shared or reached with the back button. */
  const [params, setParams] = useSearchParams()
  const activeSlug = params.get('category') ?? undefined
  const activeSubSlug = params.get('sub') ?? undefined

  const { products, isLoading, error } = useShopProducts()

  /* Only categories holding at least one listable product come back, so the
     shop never offers a tab that opens onto an empty grid. */
  const categories = useMemo(() => buildCategories(products, PRIMARY_DEPTH), [products])
  const active = categories.find(c => c.slug === activeSlug)

  /* Children are built for every category, not only the selected one: the
     dropdown lets a shopper jump straight to "Skirts" from an unselected
     "Clothing", which sets both halves of the filter at once. */
  const subCategories = useMemo(() => {
    const byCategory = new Map<string, CategoryFilter[]>()
    for (const category of categories) {
      byCategory.set(category.slug, buildCategories(products, SECONDARY_DEPTH, category.path))
    }
    return byCategory
  }, [categories, products])

  /* One child would only restate the category above it, so a tab earns a
     dropdown at two or more. */
  const childrenOf = (slug: string) => subCategories.get(slug) ?? []
  const activeChildren = active ? childrenOf(active.slug) : []
  const activeSub = activeChildren.find(c => c.slug === activeSubSlug)

  /* Which tab's dropdown is open. A short delay on close keeps the menu up
     while the pointer crosses from tab to panel, and lets it survive a
     diagonal slide across a neighbouring tab. */
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const closeTimer = useRef<number | null>(null)

  function cancelClose() {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  function openMenu(slug: string) {
    cancelClose()
    setOpenSlug(slug)
  }

  function scheduleClose() {
    cancelClose()
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null
      setOpenSlug(null)
    }, 140)
  }

  // A pending timer must not fire into an unmounted component.
  useEffect(() => cancelClose, [])

  function select(category?: CategoryFilter) {
    const next = new URLSearchParams(params)
    if (category) next.set('category', category.slug)
    else next.delete('category')
    next.delete('sub')
    setParams(next)
    setOpenSlug(null)
  }

  useEffect(() => {
    if (!openSlug) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenSlug(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openSlug])

  /* Selecting a child implies its parent, so both are written together and a
     dropdown pick works from any tab. */
  function selectSub(category: CategoryFilter, sub?: CategoryFilter) {
    const next = new URLSearchParams(params)
    next.set('category', category.slug)
    if (sub) next.set('sub', sub.slug)
    else next.delete('sub')
    setParams(next)
    setOpenSlug(null)
  }

  const visible = useMemo(() => {
    /* A slug that no longer resolves — a category renamed or retired in the
       admin since the link was shared — narrows nothing, so a stale URL lands
       on the full grid rather than an empty one. */
    const path = (activeSub ?? active)?.path
    const filtered = path ? products.filter(p => isInCategory(p, path)) : products
    return sortProducts(filtered, sort)
  }, [products, active, activeSub, sort])

  const activeTitle = activeSub?.label ?? active?.label

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
              $active={activeSlug === undefined}
              onClick={() => select(undefined)}
            >
              All
            </FilterTab>
            {categories.map(category => {
              const children = childrenOf(category.slug)
              const hasMenu = children.length > 1
              const isOpen = openSlug === category.slug

              return (
                <FilterGroup
                  key={category.slug}
                  onMouseEnter={hasMenu ? () => openMenu(category.slug) : undefined}
                  onMouseLeave={hasMenu ? scheduleClose : undefined}
                  /* Focus bubbles here from the tab and the panel's items, so
                     the menu opens for the keyboard too and closes only once
                     focus has left the group entirely. */
                  onFocus={hasMenu ? () => openMenu(category.slug) : undefined}
                  onBlur={hasMenu ? e => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) scheduleClose()
                  } : undefined}
                >
                  <FilterTab
                    $active={activeSlug === category.slug}
                    onClick={() => select(category)}
                    aria-haspopup={hasMenu ? 'true' : undefined}
                    aria-expanded={hasMenu ? isOpen : undefined}
                  >
                    {category.label}
                    {hasMenu && <TabCaret aria-hidden="true" $open={isOpen} />}
                  </FilterTab>

                  {hasMenu && (
                    <SubMenu $open={isOpen}>
                      <SubMenuPanel role="menu" aria-label={`${category.label} categories`}>
                        <SubMenuItem
                          role="menuitem"
                          $active={activeSlug === category.slug && !activeSubSlug}
                          onClick={() => selectSub(category)}
                        >
                          All {category.label}
                        </SubMenuItem>
                        {children.map(sub => (
                          <SubMenuItem
                            key={sub.slug}
                            role="menuitem"
                            $active={activeSlug === category.slug && activeSubSlug === sub.slug}
                            onClick={() => selectSub(category, sub)}
                          >
                            {sub.label}
                          </SubMenuItem>
                        ))}
                      </SubMenuPanel>
                    </SubMenu>
                  )}
                </FilterGroup>
              )
            })}
          </FilterBar>

          <RightControls>
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

        {active && activeChildren.length > 1 && (
          <SubFilterBar>
            <SubFilterTab $active={!activeSub} onClick={() => selectSub(active)}>
              All {active.label}
            </SubFilterTab>
            {activeChildren.map(sub => (
              <SubFilterTab
                key={sub.slug}
                $active={activeSubSlug === sub.slug}
                onClick={() => selectSub(active, sub)}
              >
                {sub.label}
              </SubFilterTab>
            ))}
          </SubFilterBar>
        )}

        {isLoading && <StateMessage>Loading the collection…</StateMessage>}
        {error && <ErrorMessage>Unable to load products. Please try again later.</ErrorMessage>}
        {!isLoading && !error && visible.length === 0 && (
          <StateMessage>No items available right now — check back soon.</StateMessage>
        )}
        {!isLoading && !error && visible.length > 0 && <ProductGrid products={visible} />}
      </Inner>
    </ShopSection>
  )
}
