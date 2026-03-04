import { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { Nav, NavInner, NavGroup, NavRouterLink, BrandRouterLink, CartButton, CartBadge } from './Navbar.styles'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { totalQuantity, openDrawer } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Nav $scrolled={scrolled}>
      <NavInner>
        <NavGroup>
          <NavRouterLink to="/" end>Home</NavRouterLink>
        </NavGroup>
        <BrandRouterLink to="/">Liza's Lace</BrandRouterLink>
        <NavGroup>
          <NavRouterLink to="/shop">Shop</NavRouterLink>
          <CartButton onClick={openDrawer} aria-label={`Open bag, ${totalQuantity} items`}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalQuantity > 0 && (
              <CartBadge>{totalQuantity > 99 ? '99+' : totalQuantity}</CartBadge>
            )}
          </CartButton>
        </NavGroup>
      </NavInner>
    </Nav>
  )
}
