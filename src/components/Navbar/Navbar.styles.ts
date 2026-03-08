import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: all 500ms;

  ${({ $scrolled, theme }) =>
    $scrolled
      ? css`
          background-color: ${theme.colors.cream}F2;
          backdrop-filter: blur(4px);
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
        `
      : css`
          background-color: transparent;
        `}
`

export const NavInner = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
`

/* Desktop nav groups — hidden on mobile */
export const NavGroup = styled.div<{ $right?: boolean }>`
  display: none;
  gap: 1.5rem;
  align-items: center;
  grid-column: ${({ $right }) => ($right ? '3' : '1')};
  justify-content: ${({ $right }) => ($right ? 'flex-end' : 'flex-start')};

  @media (min-width: 768px) {
    display: flex;
  }
`

const navLinkStyles = css`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.taupe};
  text-decoration: none;
  transition: color 200ms;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.taupeDark};
  }
`

export const NavRouterLink = styled(NavLink)`
  ${navLinkStyles}
`

export const BrandRouterLink = styled(NavLink)`
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  font-family: ${({ theme }) => theme.fonts.cursive};
  font-size: 1.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.taupeDark};
  text-decoration: none;
  letter-spacing: 0.05em;
  user-select: none;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`

export const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.taupe};
  display: flex;
  align-items: center;
  transition: color 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.taupeDark};
  }
`

export const CartBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -6px;
  background: ${({ theme }) => theme.colors.blush};
  color: ${({ theme }) => theme.colors.taupeDark};
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.6875rem;
  font-weight: 700;
  min-width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  pointer-events: none;
`

/* Mobile-only controls */
export const MobileLeft = styled.div`
  grid-column: 1;
  grid-row: 1;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    display: none;
  }
`

export const MobileRight = styled.div`
  grid-column: 3;
  grid-row: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  @media (min-width: 768px) {
    display: none;
  }
`

export const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.taupe};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  transition: color 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.taupeDark};
  }
`

export const HamburgerBar = styled.span<{ $open: boolean; $pos: 'top' | 'mid' | 'bot' }>`
  display: block;
  width: 20px;
  height: 1.5px;
  background: currentColor;
  transition: transform 300ms, opacity 300ms;

  ${({ $open, $pos }) =>
    $open &&
    $pos === 'top' &&
    css`transform: translateY(6.5px) rotate(45deg);`}

  ${({ $open, $pos }) =>
    $open && $pos === 'mid' && css`opacity: 0;`}

  ${({ $open, $pos }) =>
    $open &&
    $pos === 'bot' &&
    css`transform: translateY(-6.5px) rotate(-45deg);`}
`

export const MobileMenu = styled.div<{ $open: boolean }>`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? '300px' : '0')};
  opacity: ${({ $open }) => ($open ? '1' : '0')};
  transition: max-height 350ms ease, opacity 250ms ease;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.taupeDark};
  border-top: 1px solid ${({ theme }) => theme.colors.blush}44;

  @media (min-width: 768px) {
    display: none;
  }
`

export const MobileNavLink = styled(NavLink)`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.blushLight}CC;
  text-decoration: none;
  text-align: center;
  padding: 1rem 1.5rem;
  transition: color 200ms, background-color 200ms;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blush}33;

  &:last-child {
    border-bottom: none;
  }

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.blushLight};
    background-color: ${({ theme }) => theme.colors.blush}15;
  }
`
