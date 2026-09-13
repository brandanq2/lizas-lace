import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.creamLight};
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
  width: 3.5rem;
  height: 5.25rem;
  object-fit: contain;
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  letter-spacing: 0;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.display};
  margin: 0;
`

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.muted};
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
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.display};
  background: ${({ theme }) => theme.colors.cream};
  border: 1px solid ${({ theme, $error }) =>
    $error ? '#c0392b' : theme.colors.pinkSoft};
  outline: none;
  box-sizing: border-box;
  transition: border-color 200ms;

  &:focus {
    border-color: ${({ theme, $error }) =>
      $error ? '#c0392b' : theme.colors.pink};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted}88;
  }
`

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.ink};
  border: none;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 200ms;

  &:hover {
    background: ${({ theme }) => theme.colors.pinkDeep};
    color: ${({ theme }) => theme.colors.white};
  }
`

export const ErrorText = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.875rem;
  color: #c0392b;
  margin: 0;
`
