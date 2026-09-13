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
  background: ${({ theme }) => theme.colors.creamLight};
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.pinkSoft};
`

export const DrawerTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.display};
  margin: 0;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.muted};
  padding: 0.25rem;
  display: flex;
  align-items: center;
  transition: color 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.display};
  }
`

export const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
`

export const EmptyCart = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  margin-top: 3rem;
  font-size: 1rem;
`

export const LineItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.pinkSoft};

  &:last-child {
    border-bottom: none;
  }
`

export const LineImage = styled.img`
  width: 4.5rem;
  height: 6rem;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.pinkSoft};
  flex-shrink: 0;
`

export const LineImagePlaceholder = styled.div`
  width: 4.5rem;
  height: 6rem;
  background: ${({ theme }) => theme.colors.pinkSoft};
  flex-shrink: 0;
`

export const LineInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const LineTitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.display};
  margin: 0;
  line-height: 1.3;
`

export const LineVariant = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`

export const LinePrice = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.muted};
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
  border: 1px solid ${({ theme }) => theme.colors.pinkSoft};
  color: ${({ theme }) => theme.colors.display};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 200ms;

  &:hover {
    background: ${({ theme }) => theme.colors.pinkSoft};
  }
`

export const QtyValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.display};
  min-width: 1.25rem;
  text-align: center;
`

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.muted}88;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  padding: 0;
  margin-left: auto;
  transition: color 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.display};
  }
`

export const DrawerFooter = styled.div`
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.pinkSoft};
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
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.muted};
  letter-spacing: 0.04em;
`

export const SubtotalAmount = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.display};
  font-weight: 500;
`

export const CheckoutButton = styled.a`
  display: block;
  text-align: center;
  background: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.875rem 1rem;
  transition: background 200ms;

  &:hover {
    background: ${({ theme }) => theme.colors.pinkDeep};
    color: ${({ theme }) => theme.colors.white};
  }
`
