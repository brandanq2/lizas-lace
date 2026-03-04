import type { Money } from '../types/shopify'

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currencyCode,
    minimumFractionDigits: 2,
  }).format(parseFloat(money.amount))
}
