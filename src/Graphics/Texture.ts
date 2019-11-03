export class Texture {
  static fromArrayBuffer(
    name: string,
    width: number,
    height: number,
    data: ArrayBuffer
  ) {
    return new Texture(name, width, height, new Uint8Array(data))
  }

  static fromUint8ClampedArray(
    name: string,
    width: number,
    height: number,
    data: Uint8ClampedArray
  ) {
    return new Texture(name, width, height, new Uint8Array(data))
  }

  constructor(name: string, width: number, height: number, data: Uint8Array) {
    this.name = name
    this.width = width
    this.height = height
    this.data = data
  }

  name: string
  width: number
  height: number
  data: Uint8Array
}
