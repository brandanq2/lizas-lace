import type { Product } from '../../types/shopify'
import ProductCard from '../ProductCard/ProductCard'
import { Grid } from './ProductGrid.styles'

interface Props {
  products: Product[]
}

export default function ProductGrid({ products }: Props) {
  return (
    <Grid>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  )
}
