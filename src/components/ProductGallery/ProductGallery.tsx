import type { Image } from '../../types/shopify'
import { useSnapCarousel } from '../../hooks/useSnapCarousel'
import {
  Gallery, Track, Slide, SlideImage, Counter, Dots, Dot,
  Placeholder, PlaceholderMark, PlaceholderText,
} from './ProductGallery.styles'

interface Props {
  images: Image[]
  /** Fallback alt text when a photo has none of its own. */
  title: string
}

export default function ProductGallery({ images, title }: Props) {
  const { trackRef, index, onScroll, goTo } = useSnapCarousel(images.length)

  if (images.length === 0) {
    return (
      <Gallery>
        <Placeholder>
          <PlaceholderMark src="/new-logo-bw.png" alt="" aria-hidden="true" />
          <PlaceholderText>Photo coming soon</PlaceholderText>
        </Placeholder>
      </Gallery>
    )
  }

  return (
    <Gallery>
      <Track ref={trackRef} onScroll={onScroll}>
        {images.map((img, i) => (
          <Slide key={img.url}>
            <SlideImage
              src={img.url}
              alt={img.altText ?? title}
              /* The first photo is above the fold on every screen size. */
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </Slide>
        ))}
      </Track>

      {images.length > 1 && (
        <>
          <Counter aria-hidden="true">
            {index + 1} / {images.length}
          </Counter>
          <Dots aria-label="Product photos">
            {images.map((img, i) => (
              <Dot
                key={img.url}
                type="button"
                $active={i === index}
                aria-label={`Show photo ${i + 1} of ${images.length}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
              />
            ))}
          </Dots>
        </>
      )}
    </Gallery>
  )
}
