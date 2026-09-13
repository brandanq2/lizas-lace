import { Fragment, useEffect, useState } from 'react'
import type { ProductSummary } from '../../types/shopify'
import { useMediaQuery, DESKTOP_QUERY } from '../../hooks/useMediaQuery'
import ProductCard from '../ProductCard/ProductCard'
import InlinePdp from '../InlinePdp/InlinePdp'
import { Grid } from './ProductGrid.styles'

interface Props {
  products: ProductSummary[]
}

export default function ProductGrid({ products }: Props) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const isWide = useMediaQuery('(min-width: 1280px)')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const columns = isWide ? 4 : 3

  // Close the panel when the collection changes or the layout drops to mobile.
  useEffect(() => { setExpandedId(null) }, [products])
  useEffect(() => { if (!isDesktop) setExpandedId(null) }, [isDesktop])

  const expandedIndex = expandedId
    ? products.findIndex(p => p.id === expandedId)
    : -1
  const expandedProduct = expandedIndex >= 0 ? products[expandedIndex] : null

  /* Drop the panel at the end of the clicked product's row rather than
     directly after the card, so the rest of that row doesn't leave a hole. */
  const insertAfter =
    expandedIndex >= 0
      ? Math.min(
          Math.floor(expandedIndex / columns) * columns + columns - 1,
          products.length - 1
        )
      : -1

  return (
    <Grid>
      {products.map((product, i) => (
        <Fragment key={product.id}>
          <ProductCard
            product={product}
            isDesktop={isDesktop}
            expanded={product.id === expandedId}
            onToggle={() =>
              setExpandedId(current => (current === product.id ? null : product.id))
            }
          />
          {i === insertAfter && expandedProduct && (
            <InlinePdp product={expandedProduct} onClose={() => setExpandedId(null)} />
          )}
        </Fragment>
      ))}
    </Grid>
  )
}
