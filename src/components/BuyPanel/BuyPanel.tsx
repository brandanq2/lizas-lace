import { useEffect, useMemo, useRef, useState } from 'react'
import type { ProductSummary, ProductVariant } from '../../types/shopify'
import { useCart } from '../../context/CartContext'
import { availableValues, defaultSelection, getRealOptions, matchVariant } from '../../lib/product'
import {
  Panel, Field, FieldLabel, OptionRow, OptionButton,
  Stepper, StepperButton, StepperValue,
  Actions, AddToCartButton, BuyNowButton, SoldOutNote, ErrorNote,
} from './BuyPanel.styles'

interface Props {
  product: ProductSummary
  /** Hides the quantity stepper — used in the compact inline card. */
  hideQuantity?: boolean
  /** Lets the gallery follow the selection to the variant's own photo. */
  onVariantChange?: (variant: ProductVariant | undefined) => void
}

/**
 * Option picker, quantity and the two purchase actions. Shared by the inline
 * card on the shop grid and the full product page so the buying rules live in
 * one place.
 */
export default function BuyPanel({
  product,
  hideQuantity = false,
  onVariantChange,
}: Props) {
  const { addItem, buyNow, isLoading, error } = useCart()
  const [selection, setSelection] = useState<Record<string, string>>(
    () => defaultSelection(product)
  )
  const [qty, setQty] = useState(1)
  const [pending, setPending] = useState<'add' | 'buy' | null>(null)

  /* Both hosts keep this panel mounted while swapping the product underneath
     it — the grid reuses the quick-view slot for another card in the same row,
     and the product page stays put across a route change. The initialiser
     above only runs once, so without this the next product inherits the last
     one's size: at best the wrong option, at worst a sold-out one or a
     combination it has no variant for. Reset during render rather than in an
     effect so the stale selection is never painted. */
  const [selectedFor, setSelectedFor] = useState(product.id)
  if (selectedFor !== product.id) {
    setSelectedFor(product.id)
    setSelection(defaultSelection(product))
    setQty(1)
  }

  const options = useMemo(() => getRealOptions(product), [product])
  const variant = matchVariant(product, selection)

  /* Held in a ref so a host passing an inline callback cannot restart the
     effect on every render. */
  const notify = useRef(onVariantChange)
  notify.current = onVariantChange
  useEffect(() => { notify.current?.(variant) }, [variant?.id])

  const canBuy = Boolean(variant?.availableForSale)
  const busy = pending !== null || isLoading

  function choose(name: string, value: string) {
    setSelection(prev => ({ ...prev, [name]: value }))
  }

  async function handleAdd() {
    if (!variant || !canBuy) return
    setPending('add')
    await addItem(variant.id, qty)
    setPending(null)
  }

  async function handleBuyNow() {
    if (!variant || !canBuy) return
    setPending('buy')
    await buyNow(variant.id, qty)
    // No reset — buyNow navigates away to Shopify checkout on success.
    setPending(null)
  }

  return (
    <Panel>
      {options.map(option => {
        const enabled = availableValues(product, option.name, selection)
        return (
          <Field key={option.id}>
            <FieldLabel>{option.name}</FieldLabel>
            <OptionRow>
              {option.values.map(value => {
                const unavailable = !enabled.has(value)
                return (
                  <OptionButton
                    key={value}
                    type="button"
                    $selected={selection[option.name] === value}
                    $unavailable={unavailable}
                    aria-pressed={selection[option.name] === value}
                    onClick={() => choose(option.name, value)}
                  >
                    {value}
                  </OptionButton>
                )
              })}
            </OptionRow>
          </Field>
        )
      })}

      {!hideQuantity && (
        <Field>
          <FieldLabel>Quantity</FieldLabel>
          <Stepper>
            <StepperButton
              type="button"
              onClick={() => setQty(q => Math.max(1, q - 1))}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
            >
              &minus;
            </StepperButton>
            <StepperValue aria-live="polite">{qty}</StepperValue>
            <StepperButton
              type="button"
              onClick={() => setQty(q => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </StepperButton>
          </Stepper>
        </Field>
      )}

      <Actions>
        {canBuy ? (
          <>
            <AddToCartButton type="button" onClick={handleAdd} disabled={busy}>
              {pending === 'add' ? 'Adding…' : 'Add to Cart'}
            </AddToCartButton>
            <BuyNowButton type="button" onClick={handleBuyNow} disabled={busy}>
              {pending === 'buy' ? 'Redirecting…' : 'Buy it Now'}
            </BuyNowButton>
          </>
        ) : (
          <>
            <AddToCartButton type="button" disabled>
              Sold Out
            </AddToCartButton>
            <SoldOutNote>
              {variant
                ? 'This piece has found a home. One-of-a-kind — check back for new arrivals.'
                : 'That combination isn’t available. Try another option.'}
            </SoldOutNote>
          </>
        )}
        {error && <ErrorNote>{error}</ErrorNote>}
      </Actions>
    </Panel>
  )
}
