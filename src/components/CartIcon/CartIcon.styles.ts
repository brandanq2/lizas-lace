import styled from 'styled-components'

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
