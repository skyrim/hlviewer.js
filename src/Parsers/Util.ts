export function paletteToRGBA(
  pixels: Uint8Array,
  palette: Uint8Array
): Uint8Array {
  const rgba = new Uint8Array(pixels.length * 4)

  const len = pixels.length
  for (let i = 0; i < len; ++i) {
    rgba[i * 4] = palette[pixels[i] * 3]
    rgba[i * 4 + 1] = palette[pixels[i] * 3 + 1]
    rgba[i * 4 + 2] = palette[pixels[i] * 3 + 2]
    rgba[i * 4 + 3] = 255
  }

  return rgba
}

export function paletteWithLastTransToRGBA(
  pixels: Uint8Array,
  palette: Uint8Array
): Uint8Array {
  const rgba = new Uint8Array(pixels.length * 4)

  const len = pixels.length
  for (let i = 0; i < len; ++i) {
    if (pixels[i] === 255) {
      rgba[i * 4 + 3] = 0
    } else {
      rgba[i * 4] = palette[pixels[i] * 3]
      rgba[i * 4 + 1] = palette[pixels[i] * 3 + 1]
      rgba[i * 4 + 2] = palette[pixels[i] * 3 + 2]
      rgba[i * 4 + 3] = 255
    }
  }

  return rgba
}
