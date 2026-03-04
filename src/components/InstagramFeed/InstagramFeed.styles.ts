import styled from 'styled-components'

export const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.cream};
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.cursive};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.taupeDark};
  letter-spacing: 0.025em;
  margin-bottom: 0.5rem;
`

export const SubHeading = styled.a`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.taupe};
  text-decoration: none;
  margin-bottom: 3rem;
  transition: color 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.taupeDark};
  }
`

export const WidgetWrapper = styled.div`
  width: 100%;
  max-width: 56rem;

  iframe {
    width: 100%;
    border: 0;
    overflow: hidden;
    display: block;
  }
`
