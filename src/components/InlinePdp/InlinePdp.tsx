import { useEffect, useRef, useState } from 'react'
import type { ProductSummary } from '../../types/shopify'
import { formatMoney } from '../../lib/utils'
import { getImages, getVariants } from '../../lib/product'
import BuyPanel from '../BuyPanel/BuyPanel'
import {
  Panel, CloseButton, Gallery, MainImageLink, MainImage, MainPlaceholder, PlaceholderMark,
  Thumbs, Thumb, Details, TitleLink, Price, Vendor, ViewDetails,
} from './InlinePdp.styles'

interface Props {
  product: ProductSummary
  onClose: () => void
}

/**
 * The desktop quick-view that opens beneath the clicked row of the shop grid.
 * The image, the title and "View details" all link through to the full
 * product page; everything else buys in place.
 */
export default function InlinePdp({ product, onClose }: Props) {
  const [index, setIndex] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)

  const images = getImages(product)
  const variants = getVariants(product)
  const price = variants[0]?.price ?? product.priceRange.minVariantPrice
  const to = `/product/${product.handle}`

  // Reset the gallery when a different product opens in the same slot.
  useEffect(() => { setIndex(0) }, [product.id])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const active = images[index]

  return (
    <Panel ref={panelRef} role="region" aria-label={`${product.title} quick view`}>
      <CloseButton type="button" onClick={onClose} aria-label="Close quick view">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </CloseButton>

      <Gallery>
        <MainImageLink to={to} aria-label={`View details for ${product.title}`}>
          {active ? (
            <MainImage src={active.url} alt={active.altText ?? product.title} />
          ) : (
            <MainPlaceholder>
              <PlaceholderMark src="/new-logo-bw.png" alt="" aria-hidden="true" />
            </MainPlaceholder>
          )}
        </MainImageLink>

        {images.length > 1 && (
          <Thumbs>
            {images.map((img, i) => (
              <Thumb
                key={img.url}
                type="button"
                $active={i === index}
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
              >
                <img src={img.url} alt="" aria-hidden="true" />
              </Thumb>
            ))}
          </Thumbs>
        )}
      </Gallery>

      <Details>
        <TitleLink to={to}>{product.title}</TitleLink>
        <Price>{formatMoney(price)}</Price>
        {product.vendor && <Vendor>By {product.vendor}</Vendor>}

        <BuyPanel product={product} />

        <ViewDetails to={to}>View details &rsaquo;</ViewDetails>
      </Details>
    </Panel>
  )
}
