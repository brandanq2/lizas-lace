import styled from 'styled-components'

export const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.cream};
  padding: 6rem 1.5rem 4rem;
`

export const BlushGlow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse 70% 60% at 50% 40%, #EDD5D533 0%, transparent 70%);
`

export const Content = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 42rem;
`

export const LogoWrapper = styled.div`
  margin-bottom: 2rem;
  width: clamp(12rem, 28vw, 22rem);
  aspect-ratio: 3 / 4;
  border-radius: 1rem;
  overflow: hidden;
`

export const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
`

export const BrandName = styled.h1`
  font-family: ${({ theme }) => theme.fonts.cursive};
  font-size: 3rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.taupeDark};
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
  line-height: 1.25;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`

export const Tagline = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-style: italic;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.taupe};
  font-weight: 300;
  letter-spacing: 0.025em;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 20rem;
`

export const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.blush}99;
`

export const DividerIcon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  color: ${({ theme }) => theme.colors.blush};
`

export const ComingSoon = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  color: ${({ theme }) => theme.colors.taupe}99;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

export const VisitCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  max-width: 30rem;
  padding: 2rem 1.75rem;
  border: 1px solid ${({ theme }) => theme.colors.blush}44;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.laceWhite}CC;
`

export const VisitHeading = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  color: ${({ theme }) => theme.colors.blush};
  font-size: 0.8rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
`

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: fit-content;
  margin: 0 auto;
`

export const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.75rem;
  text-align: left;
`

export const InfoIcon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.15rem;
  color: ${({ theme }) => theme.colors.blush};
`

export const InfoText = styled.div`
  font-family: ${({ theme }) => theme.fonts.serif};
  color: ${({ theme }) => theme.colors.taupeDark};
  font-size: 1.05rem;
  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: 1.15rem;
  }

  em {
    display: inline-block;
    margin-top: 0.4rem;
    font-style: italic;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.taupe};
  }
`

export const InfoLabel = styled.span`
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.taupe}CC;
  margin-bottom: 0.15rem;
`

export const PhoneLink = styled.a`
  color: ${({ theme }) => theme.colors.taupeDark};
  text-decoration: none;
  transition: color 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.blush};
  }
`

export const AddressLink = styled.a`
  color: ${({ theme }) => theme.colors.taupeDark};
  text-decoration: none;
  transition: color 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.blush};
  }
`

export const PhoneMenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`

export const PhoneTrigger = styled.button`
  font: inherit;
  color: ${({ theme }) => theme.colors.taupeDark};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.blush};
  }
`

export const PhoneMenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  min-width: 12rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.blush}44;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.taupeDark}22;
`

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.7rem 1rem;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.taupeDark};
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
    border-top: 1px solid ${({ theme }) => theme.colors.blush}22;
  }
`

export const MenuIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.blush};
`

export const CopiedBadge = styled.span`
  display: block;
  margin-top: 0.35rem;
  font-size: 0.8rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.blush};
`
