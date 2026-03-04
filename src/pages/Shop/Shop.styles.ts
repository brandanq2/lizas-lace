import styled from 'styled-components'

export const ShopSection = styled.section`
  min-height: 100vh;
  padding-top: 5rem;
  background-color: ${({ theme }) => theme.colors.laceWhite};
`

export const ShopHeader = styled.div`
  text-align: center;
  padding: 3rem 1.5rem 2rem;
`

export const ShopTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.cursive};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.taupeDark};
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`

export const ShopSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.taupe};
  letter-spacing: 0.08em;
`

export const ShopContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 1.5rem 4rem;
`

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 1.5rem 2rem;
`

export const FilterTab = styled.button<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.8125rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.4rem 1.1rem;
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.taupeDark : theme.colors.blushLight};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.taupeDark : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.laceWhite : theme.colors.taupe};
  cursor: pointer;
  transition: all 200ms;

  &:hover {
    border-color: ${({ theme }) => theme.colors.taupeDark};
    background: ${({ theme, $active }) =>
      $active ? theme.colors.taupeDark : theme.colors.cream};
    color: ${({ theme, $active }) =>
      $active ? theme.colors.laceWhite : theme.colors.taupeDark};
  }
`

export const LoadingMessage = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  color: ${({ theme }) => theme.colors.taupe};
  text-align: center;
  font-size: 1.125rem;
  padding: 4rem 0;
`

export const ErrorMessage = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  color: #c0392b;
  text-align: center;
  font-size: 1rem;
  padding: 4rem 0;
`

export const EmptyMessage = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  color: ${({ theme }) => theme.colors.taupe};
  text-align: center;
  font-size: 1.125rem;
  padding: 4rem 0;
`
