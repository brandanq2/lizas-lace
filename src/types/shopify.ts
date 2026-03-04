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

export interface ProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: Money
  compareAtPrice: Money | null
}

export interface Product {
  id: string
  handle: string
  title: string
  description: string
  featuredImage: Image | null
  images: { edges: { node: Image }[] }
  variants: { edges: { node: ProductVariant }[] }
  priceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
}

export interface Collection {
  id: string
  handle: string
  title: string
  description: string
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
