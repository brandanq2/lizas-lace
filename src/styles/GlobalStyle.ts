import { createGlobalStyle } from 'styled-components'
import millieRegular from '../assets/fonts/jp-millie-june-regular.ttf'
import millieItalic from '../assets/fonts/jp-millie-june-italic.ttf'

/**
 * JP Millie June is Brigitte's brand serif, self-hosted from src/assets/fonts
 * so Vite fingerprints the files for cache busting. Both files carry
 * fsType 0 (installable embedding), so web use is permitted.
 *
 * The family ships in a single weight (usWeightClass 400) — anything asking
 * for 500+ gets a synthetic faux-bold, so display type must stay at 400.
 */
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'JP Millie June';
    src: url(${millieRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'JP Millie June';
    src: url(${millieItalic}) format('truetype');
    font-weight: 400;
    font-style: italic;
    font-display: swap;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: ${({ theme }) => theme.colors.paper};
    color: ${({ theme }) => theme.colors.ink};
    font-family: ${({ theme }) => theme.fonts.sans};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`
