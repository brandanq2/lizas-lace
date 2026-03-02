import styled, { css } from 'styled-components'

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
`

export const NavLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.taupe};
  text-decoration: none;
  transition: color 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.taupeDark};
  }
`

export const BrandLink = styled.a`
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

export const DisabledNav = styled.span`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.taupe}66;
  cursor: default;
  user-select: none;
`
