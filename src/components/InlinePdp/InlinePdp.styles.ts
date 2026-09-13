import styled from 'styled-components'
import { Link } from 'react-router-dom'

/* Spans every column of the shop grid so it reads as a drawer opening
   underneath the row that was clicked. */
export const Panel = styled.div`
  grid-column: 1 / -1;
  position: relative;
  display: grid;
  gap: 2.5rem;
  padding: 2.5rem 0 3rem;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  margin: 0.5rem 0 1.5rem;
  animation: panelIn 320ms ease both;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 20rem) minmax(0, 24rem);
    justify-content: center;
    gap: 3.5rem;
  }

  @keyframes panelIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.muted};
  transition: color 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`

export const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`

export const MainImageLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  background: ${({ theme }) => theme.colors.tint};
  overflow: hidden;
`

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const MainPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PlaceholderMark = styled.img`
  width: 3rem;
  opacity: 0.28;
`

export const Thumbs = styled.div`
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
`

export const Thumb = styled.button<{ $active: boolean }>`
  width: 3rem;
  aspect-ratio: 3 / 4;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.tint};
  border: none;
  box-shadow: ${({ theme, $active }) =>
    $active ? `inset 0 -3px 0 0 ${theme.colors.ink}` : 'none'};
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  transition: opacity 200ms;

  &:hover {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const TitleLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1.1875rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.display};
  text-decoration: none;
  border-bottom: 1px solid transparent;
  align-self: flex-start;
  transition: border-color 200ms;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.ink};
  }
`

export const Price = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
`

export const Vendor = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`

export const ViewDetails = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.ink};
  text-decoration: underline;
  text-underline-offset: 3px;
  align-self: flex-start;
  margin-top: 0.25rem;

  &:hover {
    color: ${({ theme }) => theme.colors.pinkDeep};
  }
`
