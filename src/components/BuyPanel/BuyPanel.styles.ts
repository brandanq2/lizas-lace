import styled from 'styled-components'

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const FieldLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`

export const OptionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const OptionButton = styled.button<{ $selected: boolean; $unavailable: boolean }>`
  min-width: 3rem;
  padding: 0.625rem 0.875rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.875rem;
  line-height: 1;
  cursor: ${({ $unavailable }) => ($unavailable ? 'not-allowed' : 'pointer')};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme, $unavailable }) =>
    $unavailable ? `${theme.colors.muted}88` : theme.colors.ink};
  border: 1px solid
    ${({ theme, $selected }) => ($selected ? theme.colors.ink : theme.colors.line)};
  outline: ${({ theme, $selected }) =>
    $selected ? `1px solid ${theme.colors.ink}` : 'none'};
  text-decoration: ${({ $unavailable }) => ($unavailable ? 'line-through' : 'none')};
  transition: border-color 200ms, color 200ms;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.ink};
  }
`

export const Stepper = styled.div`
  display: flex;
  align-items: stretch;
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.line};
`

export const StepperButton = styled.button`
  width: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};
  border: none;
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1.125rem;
  line-height: 1;
  cursor: pointer;
  transition: background 200ms;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.cream};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.muted}66;
    cursor: not-allowed;
  }
`

export const StepperValue = styled.span`
  min-width: 2.5rem;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.ink};
  border-left: 1px solid ${({ theme }) => theme.colors.line};
  border-right: 1px solid ${({ theme }) => theme.colors.line};
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 0.25rem;
`

const buttonBase = `
  width: 100%;
  padding: 0.9375rem 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 250ms ease, color 250ms ease, opacity 250ms ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`

export const AddToCartButton = styled.button`
  ${buttonBase}
  font-family: ${({ theme }) => theme.fonts.sans};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.ink};
  border: 1px solid ${({ theme }) => theme.colors.ink};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.paper};
  }
`

export const BuyNowButton = styled.button`
  ${buttonBase}
  font-family: ${({ theme }) => theme.fonts.sans};
  background: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.ink};
  border: 1px solid ${({ theme }) => theme.colors.pink};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.pinkDeep};
    border-color: ${({ theme }) => theme.colors.pinkDeep};
    color: ${({ theme }) => theme.colors.white};
  }
`

export const SoldOutNote = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.875rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`

export const ErrorNote = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.8125rem;
  color: #b23b3b;
  margin: 0;
`
