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

/* Category tabs on the left, sorting on the right — the shape the
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

  /* Horizontal scrolling and an escaping dropdown are mutually exclusive:
     overflow-x: auto establishes a clipping context that would cut the
     panel off at the row's edge. Only the narrow layout needs to scroll, so
     the wide one trades it away and lets the panel overhang instead. */
  @media (min-width: 900px) {
    overflow: visible;
    flex-wrap: wrap;
    row-gap: 0.75rem;
  }
`

/** Anchor for one category's dropdown. */
export const FilterGroup = styled.div`
  position: relative;
  flex-shrink: 0;
`

export const FilterTab = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  position: relative;
  display: inline-flex;
  align-items: center;
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

/** The little chevron that marks a tab as having children. */
export const TabCaret = styled.span<{ $open: boolean }>`
  display: none;

  /* Only meaningful where the dropdown exists; on touch the refinement row
     below the bar does this job instead, so the hint would mislead. */
  @media (min-width: 900px) and (hover: hover) {
    display: inline-block;
    margin-left: 0.4375rem;
    border-left: 0.1875rem solid transparent;
    border-right: 0.1875rem solid transparent;
    border-top: 0.1875rem solid currentColor;
    opacity: 0.65;
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
    transition: transform 160ms;
  }
`

/**
 * Positioner and hover bridge for a category's dropdown. The panel is inset
 * inside this wrapper's top padding so the pointer never crosses dead space
 * travelling from tab to panel — leaving that gap uncovered makes the menu
 * flicker shut mid-journey.
 */
export const SubMenu = styled.div<{ $open: boolean }>`
  display: none;

  @media (min-width: 900px) and (hover: hover) {
    display: block;
    position: absolute;
    top: 100%;
    left: -1rem;
    z-index: 20;
    padding-top: 0.75rem;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    /* visibility, not display, so the panel animates — and so the closed
       menu leaves the accessibility tree and tab order. */
    visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
    transform: translateY(${({ $open }) => ($open ? '0' : '-0.25rem')});
    transition: opacity 160ms ease, transform 160ms ease, visibility 160ms;
  }
`

export const SubMenuPanel = styled.div`
  min-width: 12rem;
  padding: 0.4375rem 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  box-shadow: 0 0.75rem 1.75rem -0.875rem rgba(35, 31, 32, 0.22);
`

export const SubMenuItem = styled.button<{ $active: boolean }>`
  display: block;
  width: 100%;
  padding: 0.4375rem 1.125rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme, $active }) => ($active ? theme.colors.pinkDeep : theme.colors.muted)};
  transition: background-color 140ms, color 140ms;

  &:hover {
    background: ${({ theme }) => theme.colors.cream};
    color: ${({ theme, $active }) => ($active ? theme.colors.pinkDeep : theme.colors.ink)};
  }
`

/**
 * The touch fallback for the dropdown: the selected category's children laid
 * out inline. Hover has no equivalent on a touchscreen, and the narrow filter
 * bar scrolls horizontally, so there is nowhere for a panel to go.
 */
export const SubFilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 0.875rem;

  @media (min-width: 900px) and (hover: hover) {
    display: none;
  }
`

export const SubFilterTab = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme, $active }) => ($active ? theme.colors.pinkDeep : theme.colors.muted)};
  text-decoration: ${({ $active }) => ($active ? 'underline' : 'none')};
  text-underline-offset: 0.25rem;
  transition: color 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.pinkDeep};
  }
`

export const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
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
