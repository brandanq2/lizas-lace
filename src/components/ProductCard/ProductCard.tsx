import { useState } from 'react'
import type { Product } from '../../types/shopify'
import { useCart } from '../../context/CartContext'
import { formatMoney } from '../../lib/utils'
import {
  Card,
  ImageWrapper,
  ProductImage,
  NoImage,
  SoldOutBadge,
  CardBody,
  ProductTitle,
  ProductPrice,
  AddButton,
} from './ProductCard.styles'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addItem, isLoading } = useCart()
  const [adding, setAdding] = useState(false)

  const firstVariant = product.variants.edges[0]?.node
  const isSoldOut = !firstVariant?.availableForSale
  const price = firstVariant?.price ?? product.priceRange.minVariantPrice
  const image = product.featuredImage

  async function handleAddToBag() {
    if (!firstVariant || isSoldOut) return
    setAdding(true)
    await addItem(firstVariant.id)
    setAdding(false)
  }

  return (
    <Card>
      <ImageWrapper>
        {image ? (
          <ProductImage src={image.url} alt={image.altText ?? product.title} loading="lazy" />
        ) : (
          <NoImage>No image</NoImage>
        )}
        {isSoldOut && <SoldOutBadge>Sold Out</SoldOutBadge>}
      </ImageWrapper>

      <CardBody>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductPrice>{formatMoney(price)}</ProductPrice>
        <AddButton
          $soldOut={isSoldOut}
          disabled={isSoldOut || adding || isLoading}
          onClick={handleAddToBag}
        >
          {isSoldOut ? 'Sold Out' : adding ? 'Adding…' : 'Add to Bag'}
        </AddButton>
      </CardBody>
    </Card>
  )
}
