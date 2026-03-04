import styled from 'styled-components'

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.blushLight};
  overflow: hidden;
  transition: box-shadow 200ms, transform 200ms;

  &:hover {
    box-shadow: 0 4px 20px rgba(92, 74, 58, 0.12);
    transform: translateY(-2px);
  }
`

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  background-color: ${({ theme }) => theme.colors.blushLight};
  overflow: hidden;
`

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;

  ${Card}:hover & {
    transform: scale(1.03);
  }
`

export const NoImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.taupe}88;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.875rem;
`

export const SoldOutBadge = styled.span`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: ${({ theme }) => theme.colors.taupeDark};
  color: ${({ theme }) => theme.colors.laceWhite};
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.25rem 0.625rem;
`

export const CardBody = styled.div`
  padding: 0.875rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`

export const ProductTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.taupeDark};
  line-height: 1.3;
  margin: 0;
`

export const ProductPrice = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.taupe};
  margin: 0;
`

export const AddButton = styled.button<{ $soldOut?: boolean }>`
  margin-top: auto;
  padding: 0.625rem 1rem;
  background: ${({ theme, $soldOut }) =>
    $soldOut ? theme.colors.blushLight : theme.colors.blush};
  color: ${({ theme }) => theme.colors.taupeDark};
  border: none;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: ${({ $soldOut }) => ($soldOut ? 'default' : 'pointer')};
  transition: background 200ms, opacity 200ms;
  width: 100%;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.blushLight};
  }

  &:disabled {
    opacity: 0.6;
  }
`
