import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useCategories } from '../../hooks/useCategories'
import {
  Nav, Bar, NavInner, HomeLink, NavGroup, BrandSlot, BrandRouterLink, BrandMark, BrandFallback,
  GlobeShopButton, ShopMenu, ShopMenuItem, ShopMenuNote,
  CartButton, CatWrap, CatIcon, CartLabel, CartBadge,
  MobileLeft, IconButton, HamburgerBar, MobileMenu, MobileNavLink,
} from './Navbar.styles'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
/* Latches the first time either menu opens, so the category request fires
     once and lazily rather than on every page load. Both menus need it: the
     globe is desktop-only, so on mobile the hamburger is what asks. */
  const [categoriesNeeded, setCategoriesNeeded] = useState(false)
  const shopRef = useRef<HTMLDivElement>(null)
  const { totalQuantity, openDrawer } = useCart()
  const { pathname } = useLocation()

  const { categories, isLoading: loadingCategories } = useCategories(categoriesNeeded)

  /* The header is transparent, so this is what fades in the frosted panel
     behind the links once content starts passing underneath them. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Collapse both menus whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
    setShopOpen(false)
  }, [pathname])

  // Dismiss the category menu on outside click or Escape.
  useEffect(() => {
    if (!shopOpen) return
    function onPointerDown(e: MouseEvent) {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) setShopOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShopOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [shopOpen])

  function closeMenu() { setMenuOpen(false) }

  function toggleShop() {
    setCategoriesNeeded(true)
    setShopOpen(o => !o)
  }

  function toggleMobileMenu() {
    setCategoriesNeeded(true)
    setMenuOpen(o => !o)
  }

  return (
    <Nav>
      <Bar $lifted={scrolled}>
        <NavInner>
          {/* Home, top left. The fixture's medallion also links home, the way
              a logo does; this is the explicit nav affordance. */}
          <HomeLink to="/" end onClick={closeMenu}>Home</HomeLink>

          {/* Brand mark — the pendant fixture, dangling from the header */}
          <BrandSlot ref={shopRef}>
            <BrandRouterLink to="/" onClick={closeMenu} aria-label="Liza's Lace — home">
              <BrandMark src="/shop-light-fixture.png" alt="" aria-hidden="true" />
              <BrandFallback>Liza's Lace</BrandFallback>
            </BrandRouterLink>

            {/* The glass globe opens the category menu. "Shop" is painted into
                the artwork, so the control only needs an accessible name. */}
            <GlobeShopButton
              type="button"
              onClick={toggleShop}
              aria-haspopup="menu"
              aria-expanded={shopOpen}
            >
              <BrandFallback>Shop by category</BrandFallback>
            </GlobeShopButton>

            {shopOpen && (
              <ShopMenu role="menu" aria-label="Shop by category">
                <ShopMenuItem to="/shop" role="menuitem" onClick={() => setShopOpen(false)}>
                  Everything
                </ShopMenuItem>
                {categories.map(c => (
                  <ShopMenuItem
                    key={c.slug}
                    to={`/shop?category=${encodeURIComponent(c.slug)}`}
                    role="menuitem"
                    onClick={() => setShopOpen(false)}
                  >
                    {c.label}
                  </ShopMenuItem>
                ))}
                {loadingCategories && <ShopMenuNote>Loading categories…</ShopMenuNote>}
                {!loadingCategories && categories.length === 0 && (
                  <ShopMenuNote>No categories yet</ShopMenuNote>
                )}
              </ShopMenu>
            )}
          </BrandSlot>

          {/* Cart — the cat, above the label. One control at every size. */}
          <NavGroup $right>
            <CartButton
              onClick={openDrawer}
              aria-label={`Open bag, ${totalQuantity} items`}
            >
              <CatWrap>
                <CatIcon src="/cat-cart.png" alt="" aria-hidden="true" />
                {totalQuantity > 0 && (
                  <CartBadge>{totalQuantity > 99 ? '99+' : totalQuantity}</CartBadge>
                )}
              </CatWrap>
              <CartLabel>CA(R)T</CartLabel>
            </CartButton>
          </NavGroup>

          {/* Mobile left — hamburger */}
          <MobileLeft>
            <IconButton
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <HamburgerBar $open={menuOpen} $pos="top" />
              <HamburgerBar $open={menuOpen} $pos="mid" />
              <HamburgerBar $open={menuOpen} $pos="bot" />
            </IconButton>
          </MobileLeft>
        </NavInner>
      </Bar>

      {/* Mobile dropdown — the same categories, since the globe menu is a
          desktop affordance and the hamburger is the mobile one. */}
      <MobileMenu $open={menuOpen}>
        <MobileNavLink to="/" end onClick={closeMenu}>Home</MobileNavLink>
        <MobileNavLink to="/shop" end onClick={closeMenu}>Shop</MobileNavLink>
        {categories.map(c => (
          <MobileNavLink
            key={c.slug}
            to={`/shop?category=${encodeURIComponent(c.slug)}`}
            onClick={closeMenu}
          >
            {c.label}
          </MobileNavLink>
        ))}
      </MobileMenu>
    </Nav>
  )
}
