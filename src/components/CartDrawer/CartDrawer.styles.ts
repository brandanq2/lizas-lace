import styled from 'styled-components'

export const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 100;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'all' : 'none')};
  transition: opacity 300ms;
`

export const Drawer = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: min(24rem, 100vw);
  background: ${({ theme }) => theme.colors.laceWhite};
  z-index: 101;
  display: flex;
  flex-direction: column;
  transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 300ms ease;
  box-shadow: -4px 0 24px rgba(92, 74, 58, 0.12);
`

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blushLight};
`

export const DrawerTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.cursive};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.taupeDark};
  margin: 0;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.taupe};
  padding: 0.25rem;
  display: flex;
  align-items: center;
  transition: color 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.taupeDark};
  }
`

export const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
`

export const EmptyCart = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  color: ${({ theme }) => theme.colors.taupe};
  text-align: center;
  margin-top: 3rem;
  font-size: 1rem;
`

export const LineItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blushLight};

  &:last-child {
    border-bottom: none;
  }
`

export const LineImage = styled.img`
  width: 4.5rem;
  height: 6rem;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.blushLight};
  flex-shrink: 0;
`

export const LineImagePlaceholder = styled.div`
  width: 4.5rem;
  height: 6rem;
  background: ${({ theme }) => theme.colors.blushLight};
  flex-shrink: 0;
`

export const LineInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const LineTitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.taupeDark};
  margin: 0;
  line-height: 1.3;
`

export const LineVariant = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.taupe};
  margin: 0;
`

export const LinePrice = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.taupe};
  margin: 0;
`

export const QtyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
`

export const QtyButton = styled.button`
  width: 1.75rem;
  height: 1.75rem;
  background: ${({ theme }) => theme.colors.cream};
  border: 1px solid ${({ theme }) => theme.colors.blushLight};
  color: ${({ theme }) => theme.colors.taupeDark};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 200ms;

  &:hover {
    background: ${({ theme }) => theme.colors.blushLight};
  }
`

export const QtyValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.taupeDark};
  min-width: 1.25rem;
  text-align: center;
`

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.taupe}88;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  padding: 0;
  margin-left: auto;
  transition: color 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.taupeDark};
  }
`

export const DrawerFooter = styled.div`
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.blushLight};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const SubtotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SubtotalLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.taupe};
  letter-spacing: 0.04em;
`

export const SubtotalAmount = styled.span`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.taupeDark};
  font-weight: 500;
`

export const CheckoutButton = styled.a`
  display: block;
  text-align: center;
  background: ${({ theme }) => theme.colors.taupeDark};
  color: ${({ theme }) => theme.colors.laceWhite};
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.9375rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.875rem 1rem;
  transition: background 200ms;

  &:hover {
    background: ${({ theme }) => theme.colors.taupe};
  }
`
