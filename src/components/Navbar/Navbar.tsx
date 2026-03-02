import { useEffect, useState } from 'react'
import { Nav, NavInner, NavGroup, NavLink, BrandLink, DisabledNav } from './Navbar.styles'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Nav $scrolled={scrolled}>
      <NavInner>
        <NavGroup>
          <NavLink href="#">Home</NavLink>
        </NavGroup>
        <BrandLink href="#">Liza's Lace</BrandLink>
        <NavGroup>
          <DisabledNav title="Shop coming soon">Shop</DisabledNav>
        </NavGroup>
      </NavInner>
    </Nav>
  )
}
