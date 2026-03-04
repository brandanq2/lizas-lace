import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.laceWhite};
  padding: 1.5rem;
`

export const Card = styled.div`
  width: 100%;
  max-width: 22rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
`

export const Logo = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.blushLight};
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.cursive};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.taupeDark};
  margin: 0;
`

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.taupe};
  margin: 0;
  line-height: 1.5;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const Input = styled.input<{ $error: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.taupeDark};
  background: ${({ theme }) => theme.colors.cream};
  border: 1px solid ${({ theme, $error }) =>
    $error ? '#c0392b' : theme.colors.blushLight};
  outline: none;
  box-sizing: border-box;
  transition: border-color 200ms;

  &:focus {
    border-color: ${({ theme, $error }) =>
      $error ? '#c0392b' : theme.colors.blush};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.taupe}88;
  }
`

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.taupeDark};
  color: ${({ theme }) => theme.colors.laceWhite};
  border: none;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 200ms;

  &:hover {
    background: ${({ theme }) => theme.colors.taupe};
  }
`

export const ErrorText = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.875rem;
  color: #c0392b;
  margin: 0;
`
