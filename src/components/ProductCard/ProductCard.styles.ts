import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

/* The card is a button on desktop (opens the inline panel) and a link on
   mobile (goes straight to the product page), so the shared visual styles
   live in a mixin applied to both. */
const cardBase = css`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  padding: 0;
  background: none;
  border: none;
  font: inherit;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  appearance: none;

  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors.ink};
    outline-offset: 4px;
  }
`

export const CardButton = styled.button<{ $expanded: boolean }>`
  ${cardBase}
`

export const CardLink = styled(Link)`
  ${cardBase}
`

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  background-color: ${({ theme }) => theme.colors.tint};
  overflow: hidden;
`

export const ProductImage = styled.img<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 500ms ease;
`

/* Empty state — a large part of this catalogue has no photography yet, so
   the placeholder is designed to look deliberate rather than broken. */
export const NoImage = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.tint};
`

export const NoImageMark = styled.img`
  width: 2.25rem;
  opacity: 0.28;
`

export const NoImageText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted}AA;
`

export const ImageBadge = styled.span`
  position: absolute;
  right: 0;
  bottom: 0.75rem;
  background: ${({ theme }) => theme.colors.paper};
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.375rem 0.75rem;
`

export const ImageCount = styled.span`
  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
  background: rgba(255, 253, 249, 0.9);
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.6875rem;
  font-variant-numeric: tabular-nums;
  padding: 0.125rem 0.4375rem;
  opacity: 0;
  transition: opacity 200ms ease;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  padding: 0.875rem 0 0;
`

export const Eyebrow = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};
  text-decoration: underline;
  text-underline-offset: 2px;
`

export const ProductTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ink};
  line-height: 1.35;
  margin: 0;
`

export const ProductPrice = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
`

export const ComparePrice = styled.span`
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.muted};
  text-decoration: line-through;
`

export const SizeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.125rem;
`

export const SizeChip = styled.span<{ $available: boolean }>`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  color: ${({ theme, $available }) =>
    $available ? theme.colors.muted : `${theme.colors.muted}77`};
  text-decoration: ${({ $available }) => ($available ? 'none' : 'line-through')};
`

export const ExpandHint = styled.span<{ $expanded: boolean }>`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    margin-top: 0.25rem;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted};
    opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
    transition: opacity 200ms ease;

    ${CardButton}:hover & {
      opacity: 1;
    }
  }
`
