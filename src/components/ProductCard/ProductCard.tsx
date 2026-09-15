import { useState } from 'react'
import type { ProductSummary } from '../../types/shopify'
import { formatMoney } from '../../lib/utils'
import { getImages, getRealOptions, getVariants, productEyebrow } from '../../lib/product'
import { useSnapCarousel } from '../../hooks/useSnapCarousel'
import {
  CardShell, CardButton, CardLink, ImageWrapper, ProductImage,
  MediaAction, MediaActionLink, CarouselArrow,
  CardTrack, CardSlide, CardDots, CardDot,
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

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points={direction === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
    </svg>
  )
}

export default function ProductCard({ product, isDesktop, expanded, onToggle }: Props) {
  const images = getImages(product)

  /* Mobile swipes through the photos, the same way the product page does;
     desktop crossfades between them with the arrows. The two track their
     position separately because only one of them is mounted at a time. */
  const swipe = useSnapCarousel(images.length)
  /* Which photo the arrows have moved to. The card used to preview the second
     photo on hover, but with arrows on every multi-photo card that only fought
     the shopper's own choice of where to be. */
  const [index, setIndex] = useState(0)

  const variants = getVariants(product)
  const firstVariant = variants[0]
  const price = firstVariant?.price ?? product.priceRange.minVariantPrice
  const compareAt = firstVariant?.compareAtPrice
  const showCompare =
    compareAt != null && parseFloat(compareAt.amount) > parseFloat(price.amount)

  const eyebrow = productEyebrow(product)
  const sizeOption = getRealOptions(product).find(o => /size/i.test(o.name))

  const hasCarousel = images.length > 1
  const shownIndex = isDesktop ? index : swipe.index

  function step(delta: number) {
    setIndex(current => (current + delta + images.length) % images.length)
  }

  const media = (
    <ImageWrapper>
      {images.length === 0 && (
        <NoImage>
          <NoImageMark src="/new-logo-bw.png" alt="" aria-hidden="true" />
          <NoImageText>Photo coming soon</NoImageText>
        </NoImage>
      )}

      {/* Mobile: a swipe track whose slides are themselves the product link,
          so no overlay is needed and nothing intercepts the gesture. */}
      {images.length > 0 && !isDesktop && (
        <CardTrack ref={swipe.trackRef} onScroll={swipe.onScroll}>
          {images.map(img => (
            <CardSlide key={img.url} to={`/product/${product.handle}`} tabIndex={-1}>
              <ProductImage
                src={img.url}
                alt={img.altText ?? product.title}
                loading="lazy"
                $visible
              />
            </CardSlide>
          ))}
        </CardTrack>
      )}

      {/* Desktop: all photos stacked, crossfaded by the arrows. */}
      {images.length > 0 && isDesktop &&
        images.map((img, i) => (
          <ProductImage
            key={img.url}
            src={img.url}
            alt={img.altText ?? product.title}
            loading="lazy"
            $visible={i === index}
          />
        ))}

      {/* Carries the same action as the body control, for the photo area that
          is not already a link. */}
      {isDesktop ? (
        <MediaAction type="button" tabIndex={-1} aria-hidden="true" onClick={onToggle} />
      ) : (
        images.length === 0 && (
          <MediaActionLink to={`/product/${product.handle}`} tabIndex={-1} aria-hidden="true" />
        )
      )}

      {hasCarousel && !isDesktop && (
        <CardDots aria-hidden="true">
          {images.map((img, i) => (
            <CardDot key={img.url} $active={i === swipe.index} />
          ))}
        </CardDots>
      )}

      {hasCarousel && isDesktop && (
        <>
          <CarouselArrow
            type="button"
            $side="left"
            aria-label={`Previous photo of ${product.title}`}
            onClick={() => step(-1)}
          >
            <Chevron direction="left" />
          </CarouselArrow>
          <CarouselArrow
            type="button"
            $side="right"
            aria-label={`Next photo of ${product.title}`}
            onClick={() => step(1)}
          >
            <Chevron direction="right" />
          </CarouselArrow>
        </>
      )}

      {!product.availableForSale && <ImageBadge>Sold</ImageBadge>}
      {hasCarousel && (
        /* There is no hover to reveal it on a touchscreen, so on mobile the
           counter simply stays put. */
        <ImageCount $alwaysVisible={!isDesktop || shownIndex > 0} aria-hidden="true">
          {shownIndex + 1} / {images.length}
        </ImageCount>
      )}
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

  return (
    <CardShell>
      {media}
      {/* Mobile goes straight to the product page; desktop opens the inline panel. */}
      {isDesktop ? (
        <CardButton type="button" $expanded={expanded} onClick={onToggle} aria-expanded={expanded}>
          {body}
        </CardButton>
      ) : (
        <CardLink to={`/product/${product.handle}`}>{body}</CardLink>
      )}
    </CardShell>
  )
}
