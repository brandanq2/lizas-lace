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
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const NavGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
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
  font-family: ${({ theme }) => theme.fonts.cursive};
  font-size: 1.875rem;
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
