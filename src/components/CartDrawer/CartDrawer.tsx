import { useCart } from '../../context/CartContext'
import { formatMoney } from '../../lib/utils'
import {
  Overlay,
  Drawer,
  DrawerHeader,
  DrawerTitle,
  CloseButton,
  DrawerBody,
  EmptyCart,
  LineItem,
  LineImage,
  LineImagePlaceholder,
  LineInfo,
  LineTitle,
  LineVariant,
  LinePrice,
  QtyRow,
  QtyButton,
  QtyValue,
  RemoveButton,
  DrawerFooter,
  SubtotalRow,
  SubtotalLabel,
  SubtotalAmount,
  CheckoutButton,
} from './CartDrawer.styles'

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeDrawer, updateItem, removeItem } = useCart()

  const lines = cart?.lines.edges.map(e => e.node) ?? []

  return (
    <>
      <Overlay $open={isOpen} onClick={closeDrawer} aria-hidden="true" />

      <Drawer $open={isOpen} aria-label="Shopping bag" role="dialog" aria-modal="true">
        <DrawerHeader>
          <DrawerTitle>Your Bag</DrawerTitle>
          <CloseButton onClick={closeDrawer} aria-label="Close bag">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </CloseButton>
        </DrawerHeader>

        <DrawerBody>
          {lines.length === 0 ? (
            <EmptyCart>Your bag is empty.</EmptyCart>
          ) : (
            lines.map(line => {
              const { merchandise } = line
              const img = merchandise.product.featuredImage
              const isVariantTitle = merchandise.title !== 'Default Title'

              return (
                <LineItem key={line.id}>
                  {img ? (
                    <LineImage src={img.url} alt={img.altText ?? merchandise.product.title} />
                  ) : (
                    <LineImagePlaceholder />
                  )}

                  <LineInfo>
                    <LineTitle>{merchandise.product.title}</LineTitle>
                    {isVariantTitle && <LineVariant>{merchandise.title}</LineVariant>}
                    <LinePrice>{formatMoney(merchandise.price)}</LinePrice>
                    <QtyRow>
                      <QtyButton
                        onClick={() =>
                          line.quantity > 1
                            ? updateItem(line.id, line.quantity - 1)
                            : removeItem(line.id)
                        }
                        aria-label="Decrease quantity"
                        disabled={isLoading}
                      >
                        −
                      </QtyButton>
                      <QtyValue>{line.quantity}</QtyValue>
                      <QtyButton
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        aria-label="Increase quantity"
                        disabled={isLoading}
                      >
                        +
                      </QtyButton>
                      <RemoveButton onClick={() => removeItem(line.id)} disabled={isLoading}>
                        Remove
                      </RemoveButton>
                    </QtyRow>
                  </LineInfo>
                </LineItem>
              )
            })
          )}
        </DrawerBody>

        {lines.length > 0 && cart && (
          <DrawerFooter>
            <SubtotalRow>
              <SubtotalLabel>Subtotal</SubtotalLabel>
              <SubtotalAmount>{formatMoney(cart.cost.subtotalAmount)}</SubtotalAmount>
            </SubtotalRow>
            <CheckoutButton href={cart.checkoutUrl} target="_blank" rel="noopener noreferrer">
              Proceed to Checkout
            </CheckoutButton>
          </DrawerFooter>
        )}
      </Drawer>
    </>
  )
}
