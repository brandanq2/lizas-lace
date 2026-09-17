import type { ProductOption, ProductSummary, ProductVariant } from '../types/shopify'

/**
 * Shopify gives every product at least one option. Products with no real
 * variants get a synthetic `Title: ["Default Title"]` option, which should
 * never be shown as a picker. Most of this catalogue is one-of-a-kind
 * vintage, so this filter is what decides whether a size row renders at all.
 */
export function getRealOptions(product: ProductSummary): ProductOption[] {
  return (product.options ?? []).filter(
    o => !(o.name === 'Title' && o.values.length === 1 && o.values[0] === 'Default Title')
  )
}

export function getVariants(product: ProductSummary): ProductVariant[] {
  return product.variants.edges.map(e => e.node)
}

export function getImages(product: ProductSummary) {
  return product.images.edges.map(e => e.node)
}

/** Default option selection: the first variant that can actually be bought. */
export function defaultSelection(product: ProductSummary): Record<string, string> {
  const variants = getVariants(product)
  const target = variants.find(v => v.availableForSale) ?? variants[0]
  const selection: Record<string, string> = {}
  for (const opt of target?.selectedOptions ?? []) {
    selection[opt.name] = opt.value
  }
  return selection
}

/** The variant matching every currently selected option value. */
export function matchVariant(
  product: ProductSummary,
  selection: Record<string, string>
): ProductVariant | undefined {
  const variants = getVariants(product)
  if (getRealOptions(product).length === 0) return variants[0]
  return variants.find(v =>
    v.selectedOptions.every(o => selection[o.name] === o.value)
  )
}

/** Option values that lead to a purchasable variant, for greying out the rest. */
export function availableValues(
  product: ProductSummary,
  optionName: string,
  selection: Record<string, string>
): Set<string> {
  const available = new Set<string>()
  for (const variant of getVariants(product)) {
    if (!variant.availableForSale) continue
    const othersMatch = variant.selectedOptions.every(
      o => o.name === optionName || selection[o.name] === undefined || selection[o.name] === o.value
    )
    if (!othersMatch) continue
    const own = variant.selectedOptions.find(o => o.name === optionName)
    if (own) available.add(own.value)
  }
  return available
}

/**
 * Where the variant's own photo sits in the product's gallery, or -1 if the
 * admin has not mapped one. Selecting a colour is supposed to show that
 * colour, which only works when someone has attached the right photo to the
 * variant in Shopify — so an unmapped variant deliberately leaves the gallery
 * where the shopper put it rather than snapping it somewhere arbitrary.
 */
export function variantImageIndex(
  product: ProductSummary,
  variant: ProductVariant | undefined
): number {
  const url = variant?.image?.url
  if (!url) return -1
  return getImages(product).findIndex(img => img.url === url)
}
