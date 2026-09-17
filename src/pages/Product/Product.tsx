import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { ProductVariant } from '../../types/shopify'
import { useProduct } from '../../hooks/useProduct'
import { formatMoney } from '../../lib/utils'
import { getImages, getVariants, variantImageIndex } from '../../lib/product'
import BuyPanel from '../../components/BuyPanel/BuyPanel'
import ProductGallery from '../../components/ProductGallery/ProductGallery'
import {
  Page, Inner, Breadcrumb, CrumbLink, CrumbCurrent, Layout,
  Details, Title, Price, ComparePrice, Vendor, Rule,
  Pickup, PickupIcon, PickupNote, Description, StateMessage, BackLink,
} from './Product.styles'

export default function Product() {
  const { handle = '' } = useParams<{ handle: string }>()
  const { product, isLoading, error } = useProduct(handle)
  const [variant, setVariant] = useState<ProductVariant | undefined>()

  // Arriving from the grid keeps the previous scroll offset otherwise.
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [handle])

  if (isLoading) {
    return (
      <Page>
        <StateMessage>Loading…</StateMessage>
      </Page>
    )
  }

  if (error || !product) {
    return (
      <Page>
        <StateMessage>
          {error ? 'Something went wrong loading this piece.' : 'This piece is no longer available.'}
        </StateMessage>
        <BackLink to="/shop">Back to the collection</BackLink>
      </Page>
    )
  }

  const images = getImages(product)
  const variants = getVariants(product)
  const price = variants[0]?.price ?? product.priceRange.minVariantPrice
  const compareAt = variants[0]?.compareAtPrice
  const showCompare =
    compareAt != null && parseFloat(compareAt.amount) > parseFloat(price.amount)

  return (
    <Page>
      <Inner>
        <Breadcrumb aria-label="Breadcrumb">
          <CrumbLink to="/">Home</CrumbLink>
          <span aria-hidden="true">&rsaquo;</span>
          <CrumbLink to="/shop">Shop</CrumbLink>
          <span aria-hidden="true">&rsaquo;</span>
          <CrumbCurrent>{product.title}</CrumbCurrent>
        </Breadcrumb>

        <Layout>
          <ProductGallery
            images={images}
            title={product.title}
            focusIndex={variantImageIndex(product, variant)}
          />

          <Details>
            <Title>{product.title}</Title>
            <Price>
              {formatMoney(price)}
              {showCompare && compareAt && <ComparePrice>{formatMoney(compareAt)}</ComparePrice>}
            </Price>
            {product.vendor && <Vendor>By {product.vendor}</Vendor>}

            <Rule />

            <BuyPanel product={product} onVariantChange={setVariant} />

            {product.availableForSale && (
              <Pickup>
                <PickupIcon
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </PickupIcon>
                <span>
                  Pickup available at the Southold shop
                  <PickupNote>85 Beckwith Ave &middot; Thursday–Sunday, 10am–5pm</PickupNote>
                </span>
              </Pickup>
            )}

            {product.descriptionHtml && (
              <>
                <Rule />
                <Description
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </>
            )}
          </Details>
        </Layout>
      </Inner>
    </Page>
  )
}
