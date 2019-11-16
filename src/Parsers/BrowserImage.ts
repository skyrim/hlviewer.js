const tempCanvas = document.createElement('canvas')

export class BrowserImage {
  static async parseArrayBuffer(buffer: ArrayBuffer) {
    const blob = new Blob([buffer])
    const image = new Image()
    await new Promise(resolve => {
      image.onload = resolve
      image.src = window.URL.createObjectURL(blob)
    })
    tempCanvas.width = image.width
    tempCanvas.height = image.height
    const ctx = tempCanvas.getContext('2d')
    if (!ctx) {
      return null
    }

    ctx.drawImage(image, 0, 0)
    const data = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)

    return {
      width: image.width,
      height: image.height,
      data: new Uint8Array(data.data)
    }
  }
}
