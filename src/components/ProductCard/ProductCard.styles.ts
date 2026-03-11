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

export const ProductImage = styled.img<{ $visible?: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $visible }) => ($visible === false ? 0 : 1)};
  transition: opacity 500ms ease, transform 400ms ease;

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

export const ArrowButton = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => $side}: 0.5rem;
  transform: translateY(-50%);
  background: rgba(255, 253, 249, 0.85);
  border: none;
  color: ${({ theme }) => theme.colors.taupeDark};
  font-size: 1.75rem;
  line-height: 1;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 200ms;
  padding: 0;
  z-index: 2;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(255, 253, 249, 1);
  }
`

export const Dots = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.375rem;
  z-index: 2;
`

export const Dot = styled.button<{ $active: boolean }>`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.taupeDark : 'rgba(255,253,249,0.7)'};
  transition: background 200ms;
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
