import { FooterEl, Inner, BrandName, FooterDivider, ContactLinks, FooterLink, Copyright, IgIcon } from './Footer.styles'

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

  return (
    <FooterEl>
      <Inner>
        <BrandName>Liza's Lace</BrandName>
        <FooterDivider />
        <ContactLinks>
          <FooterLink href="https://instagram.com/lizas.lace" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            @lizas.lace
          </FooterLink>
          <FooterLink href="mailto:bmurphy5272@gmail.com">
            bmurphy5272@gmail.com
          </FooterLink>
        </ContactLinks>
        <Copyright>&copy; {year} Liza's Lace. All rights reserved.</Copyright>
      </Inner>
    </FooterEl>
  )
}
