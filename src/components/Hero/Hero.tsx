import {
  Section,
  BlushGlow,
  Content,
  LogoWrapper,
  LogoImg,
  BrandName,
  Tagline,
  Divider,
  DividerLine,
  DividerIcon,
  ComingSoon,
} from './Hero.styles'

export default function Hero() {
  return (
    <Section>
      <BlushGlow />
      <Content>
        <LogoWrapper>
          <LogoImg src="/logo.jpeg" alt="Liza's Lace logo" />
        </LogoWrapper>
        <BrandName>Liza's Lace</BrandName>
        <Tagline>By Brigitte Katherine Quinn</Tagline>
        <Divider>
          <DividerLine />
          <DividerIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M12 2C6 2 2 6 2 12s4 10 10 10 10-4 10-10S18 2 12 2z" />
            <path d="M12 6v6l4 2" />
          </DividerIcon>
          <DividerLine />
        </Divider>
        <ComingSoon>Shop Opening Soon</ComingSoon>
      </Content>
    </Section>
  )
}
