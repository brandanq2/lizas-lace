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
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background-color: white;
  box-shadow: 0 4px 32px 0 #D4A0A022;

  @media (min-width: 768px) {
    width: 18rem;
    height: 18rem;
  }
`

export const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export const BrandName = styled.h1`
  font-family: ${({ theme }) => theme.fonts.cursive};
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.taupeDark};
  margin-bottom: 0.75rem;
  letter-spacing: 0.025em;
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
