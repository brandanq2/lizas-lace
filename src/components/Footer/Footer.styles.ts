import styled from 'styled-components'

export const FooterEl = styled.footer`
  background-color: ${({ theme }) => theme.colors.taupeDark};
  color: ${({ theme }) => theme.colors.laceWhite};
  padding: 3.5rem 1.5rem;
`

export const Inner = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
`

export const BrandName = styled.h2`
  font-family: ${({ theme }) => theme.fonts.cursive};
  font-size: 2.25rem;
  letter-spacing: 0.025em;
  color: ${({ theme }) => theme.colors.blushLight};
`

export const FooterDivider = styled.div`
  width: 4rem;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.blush}66;
`

export const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.875rem;
  letter-spacing: 0.025em;
`

export const FooterLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.blushLight}CC;
  text-decoration: none;
  transition: color 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.blushLight};
  }
`

export const Copyright = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.laceWhite}4D;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`

export const IgIcon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
`
