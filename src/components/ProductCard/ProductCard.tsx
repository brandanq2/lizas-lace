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
  ArrowButton,
  Dots,
  Dot,
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
  const [imgIndex, setImgIndex] = useState(0)

  const firstVariant = product.variants.edges[0]?.node
  const isSoldOut = !firstVariant?.availableForSale
  const price = firstVariant?.price ?? product.priceRange.minVariantPrice

  const images = product.images.edges.map(e => e.node)
  const hasMultiple = images.length > 1

  function prev(e: React.MouseEvent) {
    e.stopPropagation()
    setImgIndex(i => (i - 1 + images.length) % images.length)
  }

  function next(e: React.MouseEvent) {
    e.stopPropagation()
    setImgIndex(i => (i + 1) % images.length)
  }

  async function handleAddToBag() {
    if (!firstVariant || isSoldOut) return
    setAdding(true)
    await addItem(firstVariant.id)
    setAdding(false)
  }

  return (
    <Card>
      <ImageWrapper>
        {images.length > 0 ? images.map((img, i) => (
          <ProductImage
            key={img.url}
            src={img.url}
            alt={img.altText ?? product.title}
            loading="lazy"
            $visible={i === imgIndex}
          />
        )) : (
          <NoImage>No image</NoImage>
        )}
        {isSoldOut && <SoldOutBadge>Sold Out</SoldOutBadge>}
        {hasMultiple && (
          <>
            <ArrowButton $side="left" onClick={prev} aria-label="Previous image">&#8249;</ArrowButton>
            <ArrowButton $side="right" onClick={next} aria-label="Next image">&#8250;</ArrowButton>
            <Dots>
              {images.map((_, i) => (
                <Dot key={i} $active={i === imgIndex} onClick={e => { e.stopPropagation(); setImgIndex(i) }} />
              ))}
            </Dots>
          </>
        )}
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
