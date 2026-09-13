import styled from 'styled-components'

export const ShopSection = styled.section`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.paper};
  /* Clears the pendant mark hanging below the header, not just the bar. */
  padding-top: ${({ theme }) => theme.layout.markHeightMobile};

  @media (min-width: 768px) {
    padding-top: ${({ theme }) => theme.layout.markHeight};
  }
`

export const Inner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 2.5rem 1.25rem 5rem;

  @media (min-width: 768px) {
    padding: 3rem 2.5rem 6rem;
  }
`

export const ShopHeader = styled.div`
  text-align: center;
  margin-bottom: 1.75rem;
`

export const ShopTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.625rem;
  font-weight: 400;
  letter-spacing: 0;
  color: ${({ theme }) => theme.colors.display};
  margin: 0 0 0.4375rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`

export const ProductCount = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`

/* Collection tabs on the left, sorting on the right — the shape the
   reference listing page uses. */
export const ControlBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  @media (min-width: 900px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
`

export const FilterBar = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const FilterTab = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  position: relative;
  padding: 0 0 0.3125rem;
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme, $active }) => ($active ? theme.colors.ink : theme.colors.muted)};
  transition: color 200ms;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.ink};
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 200ms;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`

export const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
`

export const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  user-select: none;

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }

  input {
    width: 0.875rem;
    height: 0.875rem;
    accent-color: ${({ theme }) => theme.colors.ink};
    cursor: pointer;
  }
`

export const SortSelect = styled.select`
  appearance: none;
  background: transparent;
  border: none;
  padding: 0 1.25rem 0 0;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232E2A26' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 0.75rem;
`

export const StateMessage = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  padding: 5rem 0;
`

export const ErrorMessage = styled(StateMessage)`
  color: #b23b3b;
`
