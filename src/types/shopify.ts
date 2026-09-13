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
}

/**
 * What the shop grid and the inline quick view need. The catalogue runs to a
 * few hundred products, so list queries deliberately skip the description
 * fields and cap the image/variant sets.
 */
export interface ProductSummary {
  id: string
  handle: string
  title: string
  vendor: string
  productType: string
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
  description: string
  descriptionHtml: string
}

export interface Collection {
  id: string
  handle: string
  title: string
  description: string
  /** Products in this collection that have photography and will render. */
  renderableCount: number
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
