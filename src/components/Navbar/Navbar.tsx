import { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'
import {
  Nav, NavInner, NavGroup, NavRouterLink, BrandRouterLink, CartButton, CartBadge,
  MobileLeft, MobileRight, HamburgerButton, HamburgerBar, MobileMenu, MobileNavLink,
} from './Navbar.styles'

function BagIcon() {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalQuantity, openDrawer } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function closeMenu() { setMenuOpen(false) }

  return (
    <Nav $scrolled={scrolled}>
      <NavInner>
        {/* Desktop left */}
        <NavGroup>
          <NavRouterLink to="/" end>Home</NavRouterLink>
        </NavGroup>

        {/* Brand — always centered */}
        <BrandRouterLink to="/" onClick={closeMenu}>Liza's Lace</BrandRouterLink>

        {/* Desktop right */}
        <NavGroup $right>
          <NavRouterLink to="/shop">Shop</NavRouterLink>
          <CartButton onClick={openDrawer} aria-label={`Open bag, ${totalQuantity} items`}>
            <BagIcon />
            {totalQuantity > 0 && (
              <CartBadge>{totalQuantity > 99 ? '99+' : totalQuantity}</CartBadge>
            )}
          </CartButton>
        </NavGroup>

        {/* Mobile left — hamburger */}
        <MobileLeft>
          <HamburgerButton onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <HamburgerBar $open={menuOpen} $pos="top" />
            <HamburgerBar $open={menuOpen} $pos="mid" />
            <HamburgerBar $open={menuOpen} $pos="bot" />
          </HamburgerButton>
        </MobileLeft>

        {/* Mobile right — cart */}
        <MobileRight>
          <CartButton onClick={openDrawer} aria-label={`Open bag, ${totalQuantity} items`}>
            <BagIcon />
            {totalQuantity > 0 && (
              <CartBadge>{totalQuantity > 99 ? '99+' : totalQuantity}</CartBadge>
            )}
          </CartButton>
        </MobileRight>
      </NavInner>

      {/* Mobile dropdown menu */}
      <MobileMenu $open={menuOpen}>
        <MobileNavLink to="/" end onClick={closeMenu}>Home</MobileNavLink>
        <MobileNavLink to="/shop" onClick={closeMenu}>Shop</MobileNavLink>
      </MobileMenu>
    </Nav>
  )
}
