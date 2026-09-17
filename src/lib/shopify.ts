import type { Cart, CategoryFacet, Product, ProductSummary } from '../types/shopify'

const DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string
const API_VERSION = '2024-01'
const API_URL = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`

/* Shared product fields. `images` is deliberately not here — each fragment
   below asks for its own page size, and GraphQL rejects the same field
   selected twice with different arguments. */
const PRODUCT_BASE = `
  id
  handle
  title
  vendor
  productType
  category { id name ancestors { id name } }
  description
  availableForSale
  featuredImage { url altText width height }
  options { id name values }
  variants(first: 25) {
    edges {
      node {
        id
        title
        availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
        image { url altText width height }
      }
    }
  }
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
`

/* Grid card and inline quick view. Carries the plain-text description, which
   the grid needs to tell a finished listing from an unfinished one, but not
   the HTML, which only a product page renders. */
const PRODUCT_CARD_FRAGMENT = `
  ${PRODUCT_BASE}
  images(first: 10) { edges { node { url altText width height } } }
`

/* A single product page — adds the copy and the full image set. */
const PRODUCT_FRAGMENT = `
  ${PRODUCT_BASE}
  images(first: 20) { edges { node { url altText width height } } }
  descriptionHtml
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

/**
 * A listing is finished only once it has both photography and written copy.
 * Much of this catalogue is mid-reshoot, and a piece photographed but not yet
 * described is not ready to sell — so both are required rather than just the
 * image.
 *
 * Applied to list queries only. `getProduct` still resolves by handle, so a
 * link to an unfinished listing keeps working for whoever has it.
 */
function isListable(product: {
  images: { edges: unknown[] }
  description: string | null
}): boolean {
  return product.images.edges.length > 0 && (product.description ?? '').trim().length > 0
}

const PAGE_SIZE = 250
const MAX_PAGES = 8

interface Page<T> {
  pageInfo: { hasNextPage: boolean; endCursor: string | null }
  edges: { node: T }[]
}

/**
 * Walks every page of a product connection. The catalogue is larger than one
 * page, and because imageless products are filtered out afterwards, stopping
 * at the first page would silently drop most of the sellable stock.
 */
async function paginate<T>(
  run: (after: string | null) => Promise<Page<T> | null>
): Promise<T[]> {
  const out: T[] = []
  let after: string | null = null

  for (let page = 0; page < MAX_PAGES; page++) {
    const connection = await run(after)
    if (!connection) break
    out.push(...connection.edges.map(e => e.node))
    if (!connection.pageInfo.hasNextPage) break
    after = connection.pageInfo.endCursor
    if (!after) break
  }

  return out
}

export async function getProducts(): Promise<ProductSummary[]> {
  const all = await paginate<ProductSummary>(async after => {
    const data = await storefront<{ products: Page<ProductSummary> }>(
      `query GetProducts($first: Int!, $after: String) {
        products(first: $first, after: $after, sortKey: CREATED_AT, reverse: true) {
          pageInfo { hasNextPage endCursor }
          edges { node { ${PRODUCT_CARD_FRAGMENT} } }
        }
      }`,
      { first: PAGE_SIZE, after }
    )
    return data.products
  })
  return all.filter(isListable)
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

/**
 * Just enough of every product to build the category menu: its taxonomy node
 * and whether it would render. The header needs the category list before the
 * shopper has asked for any products, and this is roughly a tenth the payload
 * of walking the catalogue with the full card fragment.
 */
export async function getCategoryFacets(): Promise<CategoryFacet[]> {
  interface RawFacet {
    category: CategoryFacet['category']
    availableForSale: boolean
    images: { edges: unknown[] }
    description: string | null
  }

  const all = await paginate<RawFacet>(async after => {
    const data = await storefront<{ products: Page<RawFacet> }>(
      `query GetCategoryFacets($first: Int!, $after: String) {
        products(first: $first, after: $after) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              availableForSale
              description
              images(first: 1) { edges { node { url } } }
              category { id name ancestors { id name } }
            }
          }
        }
      }`,
      { first: PAGE_SIZE, after }
    )
    return data.products
  })

  return all
    .filter(isListable)
    .map(({ category, availableForSale }) => ({ category, availableForSale }))
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
