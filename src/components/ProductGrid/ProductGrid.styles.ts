import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
  row-gap: 2.25rem;

  @media (min-width: 640px) {
    column-gap: 1.5rem;
    row-gap: 2.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1.5rem;
    row-gap: 3rem;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`
