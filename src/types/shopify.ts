export interface Money {
  amount: string
  currencyCode: string
}

export interface Image {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface SelectedOption {
  name: string
  value: string
}

export interface ProductOption {
  id: string
  name: string
  values: string[]
}

export interface ProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: Money
  compareAtPrice: Money | null
  selectedOptions: SelectedOption[]
  /** The photo Shopify has mapped to this variant, if the admin set one. */
  image: Image | null
}

/**
 * A node in Shopify's standard product taxonomy — the admin's "Category"
 * field, which is distinct from both `productType` and collections.
 * `ancestors` arrives nearest-parent first, so a path reads leaf to root.
 */
export interface TaxonomyCategory {
  id: string
  name: string
  ancestors: { id: string; name: string }[]
}

/**
 * The minimum needed to count a product towards a category filter: its
 * taxonomy node plus whether it is in stock.
 */
export interface CategoryFacet {
  category: TaxonomyCategory | null
  availableForSale: boolean
}

/**
 * What the shop grid and the inline quick view need. The catalogue runs to a
 * few hundred products, so list queries cap the image and variant sets and
 * fetch the plain-text description only — the grid needs it to tell a
 * finished listing from an unfinished one, but not its HTML.
 */
export interface ProductSummary {
  id: string
  handle: string
  title: string
  vendor: string
  productType: string
  category: TaxonomyCategory | null
  description: string
  availableForSale: boolean
  featuredImage: Image | null
  options: ProductOption[]
  images: { edges: { node: Image }[] }
  variants: { edges: { node: ProductVariant }[] }
  priceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
}

/** A single product fetched by handle, with the copy needed for its page. */
export interface Product extends ProductSummary {
  descriptionHtml: string
}

export interface CartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: {
      title: string
      handle: string
      featuredImage: Image | null
    }
    price: Money
  }
}

export interface Cart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: Money
    totalAmount: Money
  }
  lines: { edges: { node: CartLine }[] }
}
