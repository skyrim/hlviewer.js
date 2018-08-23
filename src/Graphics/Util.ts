export const resizeTexture = (
  pixels: Uint8Array,
  width: number,
  height: number,
  newWidth: number,
  newHeight: number
) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Runtime error.')
  }
  canvas.width = width
  canvas.height = height

  const nc = document.createElement('canvas')
  const nctx = nc.getContext('2d')
  if (!nctx) {
    throw new Error('Runtime error.')
  }
  nc.width = newWidth
  nc.height = newHeight

  const cid = ctx.createImageData(width, height)
  for (let i = 0, size = width * height * 4; i < size; i += 4) {
    cid.data[i] = pixels[i]
    cid.data[i + 1] = pixels[i + 1]
    cid.data[i + 2] = pixels[i + 2]
    cid.data[i + 3] = pixels[i + 3]
  }
  ctx.putImageData(cid, 0, 0)

  nctx.drawImage(canvas, 0, 0, newWidth, newHeight)

  return new Uint8Array(nctx.getImageData(0, 0, newWidth, newHeight).data)
}

export const isPowerOfTwo = (n: number) => (n & (n - 1)) === 0

export const nextPowerOfTwo = (n: number) => {
  --n
  for (let i = 1; i < 32; i <<= 1) {
    n = n | (n >> i)
  }
  return n + 1
}