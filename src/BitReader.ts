export class BitView {
  static scratch = new DataView(new ArrayBuffer(8))

  private view: Uint8Array

  constructor(buffer: ArrayBuffer) {
    this.view = new Uint8Array(buffer, 0, buffer.byteLength)
  }

  getBits(offset: number, bits: number, signed = false) {
    const available = this.view.length * 8 - offset

    if (bits > available) {
      throw new Error('Bits out of bounds')
    }

    let value = 0
    for (let i = 0; i < bits; ) {
      const remaining = bits - i
      const bitOffset = offset & 7
      const currentByte = this.view[offset >> 3]

      // the max number of bits we can read from the current byte
      const read = Math.min(remaining, 8 - bitOffset)

      // create a mask with the correct bit width
      const mask = (1 << read) - 1
      // shift bits we want to the start of the byte and mask of the rest
      const readBits = (currentByte >> bitOffset) & mask
      value |= readBits << i

      offset += read
      i += read
    }

    if (signed) {
      // If we're not working with a full 32 bits, check the
      // imaginary MSB for this bit count and convert to a
      // valid 32-bit signed value if set.
      if (bits !== 32 && value & (1 << (bits - 1))) {
        value |= -1 ^ ((1 << bits) - 1)
      }

      return value
    }

    return value >>> 0
  }

  getInt8(offset: number) {
    return this.getBits(offset, 8, true)
  }

  getUint8(offset: number) {
    return this.getBits(offset, 8, false)
  }

  getInt16(offset: number) {
    return this.getBits(offset, 16, true)
  }

  getUint16(offset: number) {
    return this.getBits(offset, 16, false)
  }

  getInt32(offset: number) {
    return this.getBits(offset, 32, true)
  }

  getUint32(offset: number) {
    return this.getBits(offset, 32, false)
  }

  getFloat32(offset: number) {
    BitView.scratch.setUint32(0, this.getUint32(offset))
    return BitView.scratch.getFloat32(0)
  }

  getFloat64(offset: number) {
    BitView.scratch.setUint32(0, this.getUint32(offset))
    // DataView offset is in bytes.
    BitView.scratch.setUint32(4, this.getUint32(offset + 32))
    return BitView.scratch.getFloat64(0)
  }
}

export class BitStream {
  private view: BitView
  index: number

  constructor(source: ArrayBuffer) {
    this.view = new BitView(source)
    this.index = 0
  }

  readBits(bits: number, signed = false) {
    const val = this.view.getBits(this.index, bits, signed)
    this.index += bits
    return val
  }

  readInt8() {
    const val = this.view.getInt8(this.index)
    this.index += 8
    return val
  }

  readUint8() {
    const val = this.view.getUint8(this.index)
    this.index += 8
    return val
  }

  readInt16() {
    const val = this.view.getInt16(this.index)
    this.index += 16
    return val
  }

  readUint16() {
    const val = this.view.getUint16(this.index)
    this.index += 16
    return val
  }

  readInt32() {
    const val = this.view.getInt32(this.index)
    this.index += 32
    return val
  }

  readUint32() {
    const val = this.view.getUint32(this.index)
    this.index += 32
    return val
  }

  readFloat32() {
    const val = this.view.getFloat32(this.index)
    this.index += 32
    return val
  }

  readFloat64() {
    const val = this.view.getFloat64(this.index)
    this.index += 64
    return val
  }

  readString(bytes = 0, utf8 = false) {
    let i = 0
    const chars = []
    let append = true

    // Read while we still have space available, or until we've
    // hit the fixed byte length passed in.
    while (!bytes || (bytes && i < bytes)) {
      const c = this.readUint8()

      // Stop appending chars once we hit 0x00
      if (c === 0x00) {
        append = false

        // If we don't have a fixed length to read, break out now.
        if (!bytes) {
          break
        }
      }
      if (append) {
        chars.push(c)
      }

      i++
    }

    const string = String.fromCharCode.apply(null, chars)
    if (utf8) {
      try {
        // https://stackoverflow.com/a/17192845
        return decodeURIComponent(string)
      } catch (e) {
        return string
      }
    } else {
      return string
    }
  }
}

