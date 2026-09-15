import type { TaxonomyCategory } from '../types/shopify'

/**
 * Shopify's taxonomy has a real node named "Uncategorized" that products land
 * in until someone classifies them. It is not a category worth offering, so
 * those products are reachable through "All" only.
 */
const UNCATEGORIZED = 'Uncategorized'

/**
 * Depth of the primary filter row. Level 1 is always the retail-wide bucket
 * ("Apparel & Accessories"), which every garment shares and so cannot
 * usefully divide the grid; level 2 is where Clothing / Jewelry / Shoes sit.
 */
export const PRIMARY_DEPTH = 2

/** Depth of the refinement row — Clothing Tops, Outerwear, Skirts. */
export const SECONDARY_DEPTH = 3

export interface CategoryFilter {
  /** URL-safe identity, unique within the row it was built for. */
  slug: string
  /** Leaf segment of the grouping path — what the tab shows. */
  label: string
  /** Grouping path, root first. */
  path: string[]
  /** Products in the source list that fall under this path. */
  count: number
}

/** Anything carrying a taxonomy node can be grouped, products and facets alike. */
interface Categorized {
  category: TaxonomyCategory | null
}

/**
 * The category path root first. `ancestors` comes back nearest-parent first,
 * so it has to be reversed before the leaf is appended. Uncategorized and
 * unset products return an empty path and group nowhere.
 */
export function categoryPath(item: Categorized): string[] {
  const category = item.category
  if (!category || category.name === UNCATEGORIZED) return []
  return [...category.ancestors].reverse().map(a => a.name).concat(category.name)
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

/** Whether `path` sits underneath `ancestors`, with at least one segment to spare. */
function isUnder(path: string[], ancestors: string[]): boolean {
  return path.length > ancestors.length && ancestors.every((seg, i) => path[i] === seg)
}

/**
 * Groups items by the first `depth` segments of their taxonomy path. Only
 * categories that actually have items come back, so the shop never renders a
 * tab that opens onto an empty grid.
 *
 * `within` restricts the result to descendants of that path, which is how the
 * refinement row shows only the children of the selected primary category.
 */
export function buildCategories<T extends Categorized>(
  items: T[],
  depth: number,
  within: string[] = []
): CategoryFilter[] {
  const groups = new Map<string, { path: string[]; count: number }>()

  for (const item of items) {
    const path = categoryPath(item)
    if (!isUnder(path, within)) continue

    const groupPath = path.slice(0, depth)
    const key = groupPath.join(' > ')
    const group = groups.get(key)
    if (group) group.count++
    else groups.set(key, { path: groupPath, count: 1 })
  }

  const entries = [...groups.values()]

  /* Two parents can share a leaf name — "Handbags" is both its own category
     and a child of "Handbags, Wallets & Cases". Slug from the leaf where that
     reads unambiguously, and from the whole path where it does not, so a
     collision can never quietly fold two categories into one tab. */
  const leafUses = new Map<string, number>()
  for (const entry of entries) {
    const leaf = slugify(entry.path[entry.path.length - 1])
    leafUses.set(leaf, (leafUses.get(leaf) ?? 0) + 1)
  }

  return entries
    .map(entry => {
      const label = entry.path[entry.path.length - 1]
      const leafSlug = slugify(label)
      return {
        slug: leafUses.get(leafSlug) === 1 ? leafSlug : slugify(entry.path.join(' ')),
        label,
        path: entry.path,
        count: entry.count,
      }
    })
    .sort((a, b) => a.label.localeCompare(b.label))
}

/** Matches a product against a selected category path. */
export function isInCategory(item: Categorized, path: string[]): boolean {
  const own = categoryPath(item)
  return path.every((seg, i) => own[i] === seg)
}
