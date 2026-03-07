import { useState, FormEvent } from 'react'
import {
  FooterEl, Inner, BrandName, FooterDivider, ContactLinks, FooterLink, Copyright, IgIcon,
  NewsletterSection, NewsletterHeading, NewsletterSubtext, NewsletterForm,
  NewsletterInput, NewsletterButton, NewsletterFeedback,
} from './Footer.styles'

async function subscribeEmail(email: string): Promise<void> {
  const publicKey = import.meta.env.VITE_KLAVIYO_PUBLIC_KEY as string
  const listId = import.meta.env.VITE_KLAVIYO_LIST_ID as string

  const res = await fetch(
    `https://a.klaviyo.com/client/subscriptions/?company_id=${publicKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'revision': '2024-02-15',
      },
      body: JSON.stringify({
        data: {
          type: 'subscription',
          attributes: {
            profile: {
              data: {
                type: 'profile',
                attributes: { email },
              },
            },
          },
          relationships: {
            list: {
              data: { type: 'list', id: listId },
            },
          },
        },
      }),
    }
  )

  if (!res.ok) {
    throw new Error(`Klaviyo error: ${res.status}`)
  }
}

function InstagramIcon() {
  return (
    <IgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </IgIcon>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const footerEmail = "brigitte@lizaslace.com";

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('Please enter a valid email address.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      await subscribeEmail(trimmed)
      setStatus('success')
      setEmail('')
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <FooterEl>
      <Inner>
        <BrandName>Liza's Lace</BrandName>
        <FooterDivider />
        <NewsletterSection>
          <NewsletterHeading>Join the List</NewsletterHeading>
          <NewsletterSubtext>New arrivals, restocks & stories from the collection.</NewsletterSubtext>
          {status === 'success' ? (
            <NewsletterFeedback>Thank you — you're on the list!</NewsletterFeedback>
          ) : (
            <>
              <NewsletterForm onSubmit={handleSubscribe} noValidate>
                <NewsletterInput
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  aria-label="Email address"
                />
                <NewsletterButton type="submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending…' : 'Subscribe'}
                </NewsletterButton>
              </NewsletterForm>
              {status === 'error' && (
                <NewsletterFeedback $error>{errorMsg}</NewsletterFeedback>
              )}
            </>
          )}
        </NewsletterSection>
        <FooterDivider />
        <ContactLinks>
          <FooterLink href="https://instagram.com/lizas.lace" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            @lizas.lace
          </FooterLink>
          <FooterLink href={`mailto:${footerEmail}`}>
            {footerEmail}
          </FooterLink>
        </ContactLinks>
        <Copyright>&copy; {year} Liza's Lace. All rights reserved.</Copyright>
      </Inner>
    </FooterEl>
  )
}
