import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'
import type { Cart } from '../types/shopify'
import { createCart, addToCart, updateCartLine, removeCartLine, getCart } from '../lib/shopify'

const CART_ID_KEY = 'liza_cart_id'

interface CartState {
  cart: Cart | null
  isOpen: boolean
  isLoading: boolean
  error: string | null
}

type CartAction =
  | { type: 'SET_CART'; cart: Cart }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'CLEAR_CART' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cart: action.cart, isLoading: false, error: null }
    case 'SET_LOADING':
      return { ...state, isLoading: action.loading }
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false }
    case 'OPEN_DRAWER':
      return { ...state, isOpen: true }
    case 'CLOSE_DRAWER':
      return { ...state, isOpen: false }
    case 'CLEAR_CART':
      return { ...state, cart: null }
    default:
      return state
  }
}

interface CartContextValue {
  cart: Cart | null
  isOpen: boolean
  isLoading: boolean
  totalQuantity: number
  addItem: (variantId: string, qty?: number) => Promise<void>
  updateItem: (lineId: string, qty: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  openDrawer: () => void
  closeDrawer: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null,
    isOpen: false,
    isLoading: false,
    error: null,
  })

  // Rehydrate cart from localStorage on mount
  useEffect(() => {
    const savedId = localStorage.getItem(CART_ID_KEY)
    if (!savedId) return

    getCart(savedId)
      .then(cart => {
        if (cart) dispatch({ type: 'SET_CART', cart })
        else localStorage.removeItem(CART_ID_KEY)
      })
      .catch(() => localStorage.removeItem(CART_ID_KEY))
  }, [])

  async function addItem(variantId: string, qty = 1) {
    dispatch({ type: 'SET_LOADING', loading: true })
    try {
      const cartId = localStorage.getItem(CART_ID_KEY)
      const cart = cartId
        ? await addToCart(cartId, variantId, qty)
        : await createCart(variantId, qty)

      localStorage.setItem(CART_ID_KEY, cart.id)
      dispatch({ type: 'SET_CART', cart })
      dispatch({ type: 'OPEN_DRAWER' })
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: (e as Error).message })
    }
  }

  async function updateItem(lineId: string, qty: number) {
    const cartId = localStorage.getItem(CART_ID_KEY)
    if (!cartId) return
    dispatch({ type: 'SET_LOADING', loading: true })
    try {
      const cart = await updateCartLine(cartId, lineId, qty)
      dispatch({ type: 'SET_CART', cart })
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: (e as Error).message })
    }
  }

  async function removeItem(lineId: string) {
    const cartId = localStorage.getItem(CART_ID_KEY)
    if (!cartId) return
    dispatch({ type: 'SET_LOADING', loading: true })
    try {
      const cart = await removeCartLine(cartId, lineId)
      dispatch({ type: 'SET_CART', cart })
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: (e as Error).message })
    }
  }

  const value: CartContextValue = {
    cart: state.cart,
    isOpen: state.isOpen,
    isLoading: state.isLoading,
    totalQuantity: state.cart?.totalQuantity ?? 0,
    addItem,
    updateItem,
    removeItem,
    openDrawer: () => dispatch({ type: 'OPEN_DRAWER' }),
    closeDrawer: () => dispatch({ type: 'CLOSE_DRAWER' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
