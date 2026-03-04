import { type FormEvent, type ReactNode, useState } from 'react'
import {
  Wrapper,
  Card,
  Logo,
  Title,
  Subtitle,
  Form,
  Input,
  SubmitButton,
  ErrorText,
} from './PasswordGate.styles'

const SESSION_KEY = 'liza_shop_unlocked'
const SHOP_PASSWORD = import.meta.env.VITE_SHOP_PASSWORD as string

interface Props {
  children: ReactNode
}

export default function PasswordGate({ children }: Props) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  )
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  if (unlocked) return <>{children}</>

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (input === SHOP_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setUnlocked(true)
    } else {
      setError(true)
      setInput('')
    }
  }

  return (
    <Wrapper>
      <Card>
        <Logo src="/logo.jpeg" alt="Liza's Lace" />
        <Title>Liza's Lace</Title>
        <Subtitle>This page is password protected.<br />Enter the password to continue.</Subtitle>

        <Form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="Password"
            value={input}
            $error={error}
            onChange={e => {
              setInput(e.target.value)
              setError(false)
            }}
            autoFocus
          />
          {error && <ErrorText>Incorrect password. Please try again.</ErrorText>}
          <SubmitButton type="submit">Enter</SubmitButton>
        </Form>
      </Card>
    </Wrapper>
  )
}
