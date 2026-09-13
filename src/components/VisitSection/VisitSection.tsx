import { useState, useEffect, useRef } from 'react'
import {
  Section, Inner, Eyebrow, Heading,
  InfoList, InfoRow, InfoIcon, InfoLabel, InfoText, AddressLink,
  PhoneMenuWrapper, PhoneTrigger, PhoneMenuDropdown, MenuItem, MenuIcon, CopiedBadge,
} from './VisitSection.styles'

const PHONE_DISPLAY = '631-487-2283'
const PHONE_TEL = '+16314872283'
const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('85 Beckwith Ave, Southold, NY')

function PhoneMenu() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [open])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(PHONE_DISPLAY)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable — ignore */
    }
    setOpen(false)
  }

  return (
    <PhoneMenuWrapper ref={wrapperRef}>
      <PhoneTrigger
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {PHONE_DISPLAY}
      </PhoneTrigger>
      {open && (
        <PhoneMenuDropdown role="menu">
          <MenuItem as="a" href={`tel:${PHONE_TEL}`} role="menuitem" onClick={() => setOpen(false)}>
            <MenuIcon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </MenuIcon>
            Call
          </MenuItem>
          <MenuItem type="button" role="menuitem" onClick={handleCopy}>
            <MenuIcon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </MenuIcon>
            Copy number
          </MenuItem>
        </PhoneMenuDropdown>
      )}
      {copied && <CopiedBadge>Copied!</CopiedBadge>}
    </PhoneMenuWrapper>
  )
}

export default function VisitSection() {
  return (
    <Section id="visit">
      <Inner>
        <Eyebrow>Now Open</Eyebrow>
        <Heading>Visit the Shop</Heading>

        <InfoList>
          <InfoRow>
            <InfoIcon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </InfoIcon>
            <InfoLabel>Location</InfoLabel>
            <InfoText>
              <AddressLink href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                85 Beckwith Ave
                <br />
                Southold, NY
              </AddressLink>
            </InfoText>
          </InfoRow>

          <InfoRow>
            <InfoIcon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </InfoIcon>
            <InfoLabel>Hours</InfoLabel>
            <InfoText>
              Thursday &ndash; Sunday
              <br />
              10am &ndash; 5pm EST
              <em>Available by appointment outside these hours</em>
            </InfoText>
          </InfoRow>

          <InfoRow>
            <InfoIcon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </InfoIcon>
            <InfoLabel>Contact Brigitte</InfoLabel>
            <InfoText>
              <PhoneMenu />
            </InfoText>
          </InfoRow>
        </InfoList>
      </Inner>
    </Section>
  )
}
