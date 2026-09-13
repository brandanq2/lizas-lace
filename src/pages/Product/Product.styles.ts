import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Page = styled.div`
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
  padding: 1.5rem 1.25rem 5rem;

  @media (min-width: 768px) {
    padding: 2rem 2.5rem 6rem;
  }
`

export const Breadcrumb = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4375rem;
  margin-bottom: 2rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`

export const CrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.muted};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`

export const CrumbCurrent = styled.span`
  color: ${({ theme }) => theme.colors.ink};
`

export const Layout = styled.div`
  display: grid;
  gap: 2.5rem;

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    gap: 4rem;
    align-items: start;
  }
`

export const Gallery = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const GalleryFigure = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  background: ${({ theme }) => theme.colors.tint};
  overflow: hidden;
`

export const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const GalleryPlaceholder = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.tint};
`

export const PlaceholderMark = styled.img`
  width: 4rem;
  opacity: 0.28;
`

export const PlaceholderText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted}AA;
`

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: 900px) {
    position: sticky;
    top: calc(${({ theme }) => theme.layout.navHeight} + 1.5rem);
  }
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: clamp(1.375rem, 2.6vw, 1.875rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.display};
  margin: 0;
`

export const Price = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
`

export const ComparePrice = styled.span`
  margin-left: 0.625rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.muted};
  text-decoration: line-through;
`

export const Vendor = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`

export const Rule = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background: ${({ theme }) => theme.colors.line};
  margin: 0.25rem 0;
`

export const Pickup = styled.div`
  display: flex;
  gap: 0.625rem;
  align-items: flex-start;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.ink};
  line-height: 1.5;
`

export const PickupIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  margin-top: 0.1875rem;
  color: ${({ theme }) => theme.colors.pink};
`

export const PickupNote = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.8125rem;
`

export const Description = styled.div`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.ink};

  p {
    margin: 0 0 0.875rem;
  }

  ul,
  ol {
    margin: 0 0 0.875rem;
    padding-left: 1.25rem;
  }

  li {
    margin-bottom: 0.375rem;
  }

  a {
    color: ${({ theme }) => theme.colors.ink};
  }

  strong {
    font-weight: 600;
  }
`

export const StateMessage = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  padding: 6rem 1.5rem;
`

export const BackLink = styled(Link)`
  display: block;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
`
