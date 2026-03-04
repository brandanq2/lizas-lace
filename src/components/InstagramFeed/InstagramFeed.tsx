import { Section, Heading, SubHeading, WidgetWrapper } from './InstagramFeed.styles'

const WIDGET_ID = '37f30ea318f4549eb8f04fe1adb679ed'

export default function InstagramFeed() {
  return (
    <Section>
      <Heading>Follow Along</Heading>
      <SubHeading
        href="https://instagram.com/lizas.lace"
        target="_blank"
        rel="noopener noreferrer"
      >
        @lizas.lace
      </SubHeading>
      <WidgetWrapper>
        <iframe
          src={`//lightwidget.com/widgets/${WIDGET_ID}.html`}
          scrolling="no"
          allowTransparency={true}
          className="lightwidget-widget"
          title="Liza's Lace Instagram Feed"
        />
      </WidgetWrapper>
    </Section>
  )
}
