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
  letter-spacing: 0.05em;
  font-weight: 400;
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

export const NewsletterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
`

export const NewsletterHeading = styled.p`
  font-family: ${({ theme }) => theme.fonts.cursive};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.blushLight};
  letter-spacing: 0.025em;
`

export const NewsletterSubtext = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.laceWhite}99;
  letter-spacing: 0.05em;
`

export const NewsletterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  max-width: 26rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

export const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.6rem 1rem;
  background: ${({ theme }) => theme.colors.laceWhite}1A;
  border: 1px solid ${({ theme }) => theme.colors.blush}55;
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.laceWhite};
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.875rem;
  outline: none;
  transition: border-color 200ms;

  &::placeholder {
    color: ${({ theme }) => theme.colors.laceWhite}55;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.blush};
  }
`

export const NewsletterButton = styled.button`
  padding: 0.6rem 1.25rem;
  background: ${({ theme }) => theme.colors.blush};
  color: ${({ theme }) => theme.colors.taupeDark};
  border: none;
  border-radius: 2px;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  transition: background 200ms;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.blushLight};
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`

export const NewsletterFeedback = styled.p<{ $error?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  color: ${({ theme, $error }) => $error ? '#e07070' : theme.colors.blushLight};
`
