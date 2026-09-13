import { useMemo, useState } from 'react'
import type { ProductSummary } from '../../types/shopify'
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
}

/**
 * Option picker, quantity and the two purchase actions. Shared by the inline
 * card on the shop grid and the full product page so the buying rules live in
 * one place.
 */
export default function BuyPanel({ product, hideQuantity = false }: Props) {
  const { addItem, buyNow, isLoading, error } = useCart()
  const [selection, setSelection] = useState<Record<string, string>>(
    () => defaultSelection(product)
  )
  const [qty, setQty] = useState(1)
  const [pending, setPending] = useState<'add' | 'buy' | null>(null)

  const options = useMemo(() => getRealOptions(product), [product])
  const variant = matchVariant(product, selection)
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
