import { useState } from 'react'
import type { ProductSummary } from '../../types/shopify'
import { formatMoney } from '../../lib/utils'
import { getImages, getRealOptions, getVariants, productEyebrow } from '../../lib/product'
import {
  CardButton, CardLink, ImageWrapper, ProductImage,
  NoImage, NoImageMark, NoImageText, ImageBadge, ImageCount,
  CardBody, Eyebrow, ProductTitle, ProductPrice, ComparePrice,
  SizeRow, SizeChip, ExpandHint,
} from './ProductCard.styles'

interface Props {
  product: ProductSummary
  /** Desktop only — the grid opens an inline panel instead of navigating. */
  isDesktop: boolean
  expanded: boolean
  onToggle: () => void
}

export default function ProductCard({ product, isDesktop, expanded, onToggle }: Props) {
  const [hovering, setHovering] = useState(false)

  const images = getImages(product)
  const variants = getVariants(product)
  const firstVariant = variants[0]
  const price = firstVariant?.price ?? product.priceRange.minVariantPrice
  const compareAt = firstVariant?.compareAtPrice
  const showCompare =
    compareAt != null && parseFloat(compareAt.amount) > parseFloat(price.amount)

  const eyebrow = productEyebrow(product)
  const sizeOption = getRealOptions(product).find(o => /size/i.test(o.name))

  /* Swap to the second photo on hover, the way the reference grid does. */
  const activeIndex = hovering && images.length > 1 ? 1 : 0

  const media = (
    <ImageWrapper>
      {images.length > 0 ? (
        images.map((img, i) => (
          <ProductImage
            key={img.url}
            src={img.url}
            alt={img.altText ?? product.title}
            loading="lazy"
            $visible={i === activeIndex}
          />
        ))
      ) : (
        <NoImage>
          <NoImageMark src="/new-logo-bw.png" alt="" aria-hidden="true" />
          <NoImageText>Photo coming soon</NoImageText>
        </NoImage>
      )}
      {!product.availableForSale && <ImageBadge>Sold</ImageBadge>}
      {images.length > 1 && <ImageCount>1 / {images.length}</ImageCount>}
    </ImageWrapper>
  )

  const body = (
    <CardBody>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>
        {formatMoney(price)}
        {showCompare && compareAt && <ComparePrice>{formatMoney(compareAt)}</ComparePrice>}
      </ProductPrice>
      {sizeOption && (
        <SizeRow>
          {sizeOption.values.map(value => {
            const available = variants.some(
              v =>
                v.availableForSale &&
                v.selectedOptions.some(o => o.name === sizeOption.name && o.value === value)
            )
            return (
              <SizeChip key={value} $available={available}>
                {value}
              </SizeChip>
            )
          })}
        </SizeRow>
      )}
      <ExpandHint $expanded={expanded}>{expanded ? 'Close' : 'Quick view'}</ExpandHint>
    </CardBody>
  )

  // Mobile goes straight to the product page; desktop opens the inline panel.
  if (!isDesktop) {
    return (
      <CardLink
        to={`/product/${product.handle}`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {media}
        {body}
      </CardLink>
    )
  }

  return (
    <CardButton
      type="button"
      $expanded={expanded}
      onClick={onToggle}
      aria-expanded={expanded}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {media}
      {body}
    </CardButton>
  )
}
