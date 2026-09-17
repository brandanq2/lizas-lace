import { useEffect } from 'react'
import type { Image } from '../../types/shopify'
import { useSnapCarousel } from '../../hooks/useSnapCarousel'
import Chevron from '../icons/Chevron'
import {
  Gallery, Track, Slide, SlideImage, GalleryArrow, Counter, Dots, Dot,
  Placeholder, PlaceholderMark, PlaceholderText,
} from './ProductGallery.styles'

interface Props {
  images: Image[]
  /** Fallback alt text when a photo has none of its own. */
  title: string
  /**
   * Photo to bring into view, when something outside the gallery decides —
   * currently the buy panel, following a selected variant to its own image.
   * Ignored when negative, which is what an unmapped variant reports.
   */
  focusIndex?: number
}

export default function ProductGallery({ images, title, focusIndex }: Props) {
  const { trackRef, index, onScroll, goTo } = useSnapCarousel(images.length)

  useEffect(() => {
    if (focusIndex !== undefined && focusIndex >= 0) goTo(focusIndex)
  }, [focusIndex, goTo])

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

  const hasMore = images.length > 1

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

      {hasMore && (
        <>
          <GalleryArrow
            type="button"
            $side="left"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous photo"
          >
            <Chevron direction="left" />
          </GalleryArrow>
          <GalleryArrow
            type="button"
            $side="right"
            onClick={() => goTo(index + 1)}
            disabled={index === images.length - 1}
            aria-label="Next photo"
          >
            <Chevron direction="right" />
          </GalleryArrow>

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
