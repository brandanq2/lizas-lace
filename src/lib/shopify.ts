import type { Cart, Collection, Product } from '../types/shopify'

const DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string
const API_VERSION = '2024-01'
const API_URL = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`

const PRODUCT_FRAGMENT = `
  id
  handle
  title
  description
  featuredImage { url altText width height }
  images(first: 5) { edges { node { url altText width height } } }
  variants(first: 10) {
    edges {
      node {
        id
        title
        availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
      }
    }
  }
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
`

const CART_FRAGMENT = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product {
              title
              handle
              featuredImage { url altText width height }
            }
          }
        }
      }
    }
  }
`

async function storefront<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`)
  }

  const { data, errors } = await res.json()
  if (errors?.length) {
    throw new Error(errors.map((e: { message: string }) => e.message).join(', '))
  }

  return data as T
}

export async function getProducts(first = 24): Promise<Product[]> {
  const data = await storefront<{ products: { edges: { node: Product }[] } }>(
    `query GetProducts($first: Int!) {
      products(first: $first, sortKey: CREATED_AT, reverse: true) {
        edges { node { ${PRODUCT_FRAGMENT} } }
      }
    }`,
    { first }
  )
  return data.products.edges.map(e => e.node)
}

export async function getProduct(handle: string): Promise<Product | null> {
  const data = await storefront<{ productByHandle: Product | null }>(
    `query GetProduct($handle: String!) {
      productByHandle(handle: $handle) { ${PRODUCT_FRAGMENT} }
    }`,
    { handle }
  )
  return data.productByHandle
}

export async function createCart(variantId: string, quantity: number): Promise<Cart> {
  const data = await storefront<{ cartCreate: { cart: Cart } }>(
    `mutation CartCreate($variantId: ID!, $quantity: Int!) {
      cartCreate(input: {
        lines: [{ merchandiseId: $variantId, quantity: $quantity }]
      }) {
        cart { ${CART_FRAGMENT} }
      }
    }`,
    { variantId, quantity }
  )
  return data.cartCreate.cart
}

export async function addToCart(cartId: string, variantId: string, quantity: number): Promise<Cart> {
  const data = await storefront<{ cartLinesAdd: { cart: Cart } }>(
    `mutation CartLinesAdd($cartId: ID!, $variantId: ID!, $quantity: Int!) {
      cartLinesAdd(cartId: $cartId, lines: [{ merchandiseId: $variantId, quantity: $quantity }]) {
        cart { ${CART_FRAGMENT} }
      }
    }`,
    { cartId, variantId, quantity }
  )
  return data.cartLinesAdd.cart
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await storefront<{ cartLinesUpdate: { cart: Cart } }>(
    `mutation CartLinesUpdate($cartId: ID!, $lineId: ID!, $quantity: Int!) {
      cartLinesUpdate(cartId: $cartId, lines: [{ id: $lineId, quantity: $quantity }]) {
        cart { ${CART_FRAGMENT} }
      }
    }`,
    { cartId, lineId, quantity }
  )
  return data.cartLinesUpdate.cart
}

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const data = await storefront<{ cartLinesRemove: { cart: Cart } }>(
    `mutation CartLinesRemove($cartId: ID!, $lineId: ID!) {
      cartLinesRemove(cartId: $cartId, lineIds: [$lineId]) {
        cart { ${CART_FRAGMENT} }
      }
    }`,
    { cartId, lineId }
  )
  return data.cartLinesRemove.cart
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await storefront<{ cart: Cart | null }>(
    `query GetCart($cartId: ID!) {
      cart(id: $cartId) { ${CART_FRAGMENT} }
    }`,
    { cartId }
  )
  return data.cart
}

export async function getCollections(first = 30): Promise<Collection[]> {
  const data = await storefront<{ collections: { edges: { node: Collection }[] } }>(
    `query GetCollections($first: Int!) {
      collections(first: $first, sortKey: TITLE) {
        edges { node { id handle title description } }
      }
    }`,
    { first }
  )
  return data.collections.edges.map(e => e.node)
}

export async function getCollectionProducts(handle: string, first = 24): Promise<Product[]> {
  const data = await storefront<{ collection: { products: { edges: { node: Product }[] } } | null }>(
    `query GetCollectionProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        products(first: $first, sortKey: CREATED, reverse: true) {
          edges { node { ${PRODUCT_FRAGMENT} } }
        }
      }
    }`,
    { handle, first }
  )
  return data.collection?.products.edges.map(e => e.node) ?? []
}
