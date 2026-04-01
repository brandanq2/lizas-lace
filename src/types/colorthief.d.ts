declare module 'colorthief' {
  export function getColor(
    source: string | HTMLImageElement,
    options?: Record<string, unknown>
  ): Promise<[number, number, number] | null>

  export function getPalette(
    source: string | HTMLImageElement,
    options?: Record<string, unknown>
  ): Promise<[number, number, number][] | null>
}
