import styled from 'styled-components'

export const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.cream};
  padding: 4.5rem 1.5rem 5rem;

  @media (min-width: 768px) {
    padding: 6rem 2.5rem 6.5rem;
  }
`

export const Inner = styled.div`
  max-width: 62rem;
  margin: 0 auto;
  text-align: center;
`

export const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.pinkDeep};
  margin: 0 0 0.875rem;
`

export const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.625rem;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.display};
  margin: 0 0 2.75rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`

export const InfoList = styled.div`
  display: grid;
  gap: 2.5rem;
  text-align: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
  }
`

export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  padding: 0 1.5rem;

  @media (min-width: 768px) {
    & + & {
      border-left: 1px solid ${({ theme }) => theme.colors.pink}44;
    }
  }
`

export const InfoIcon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.pink};
`

export const InfoLabel = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`

export const InfoText = styled.div`
  font-family: ${({ theme }) => theme.fonts.sans};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 1.0625rem;
  line-height: 1.5;

  em {
    display: block;
    margin-top: 0.5rem;
    font-style: italic;
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`

export const AddressLink = styled.a`
  color: ${({ theme }) => theme.colors.ink};
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 200ms;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.pink};
  }
`

export const PhoneMenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`

export const PhoneTrigger = styled.button`
  font: inherit;
  color: ${({ theme }) => theme.colors.ink};
  background: none;
  border: none;
  border-bottom: 1px solid transparent;
  padding: 0;
  cursor: pointer;
  transition: border-color 200ms;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.pink};
  }
`

export const PhoneMenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.625rem);
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  flex-direction: column;
  min-width: 12rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(46, 42, 38, 0.12);
`

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.ink};
  background: none;
  border: none;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background 200ms;

  &:hover {
    background: ${({ theme }) => theme.colors.cream};
  }

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.line};
  }
`

export const MenuIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.pink};
`

export const CopiedBadge = styled.span`
  display: block;
  margin-top: 0.375rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.8125rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.pink};
`
