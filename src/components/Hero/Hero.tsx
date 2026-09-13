import { heroImages } from './heroImages'
import {
  Section, Wordmark, WordmarkHalf, PhotoGrid, PhotoCell, Photo,
  Below, Tagline, ShopNow,
} from './Hero.styles'

export default function Hero() {
  return (
    <Section>
      {/* The brand name splits around the pendant fixture hanging out of the
          header. Two halves of one name, so only the first carries the
          heading and the second is marked presentational to screen readers. */}
      <Wordmark>
        <WordmarkHalf>Liza&rsquo;s</WordmarkHalf>
        <WordmarkHalf as="span" role="presentation">Lace</WordmarkHalf>
      </Wordmark>

      {heroImages.length > 0 && (
        <PhotoGrid>
          {heroImages.map((image, i) => (
            <PhotoCell key={image.src}>
              <Photo
                src={image.src}
                alt={image.alt}
                $position={image.position}
                /* The first row is above the fold; the rest can wait. */
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </PhotoCell>
          ))}
        </PhotoGrid>
      )}

      <Below>
        <Tagline>Vintage Wears &middot; Southold, New York</Tagline>
        <ShopNow to="/shop">Shop Now</ShopNow>
      </Below>
    </Section>
  )
}
