export enum ReaderDataType {
  UByte = 0,
  Byte = 1,
  UShort = 2,
  Short = 3,
  UInt = 4,
  Int = 5,
  Float = 6,
  Double = 7,
  NString = 8,
  String = 9
}

export class Reader {
  data: DataView
  offset: number

  constructor(data: ArrayBuffer) {
    this.data = new DataView(data)
    this.offset = 0
  }

  length() {
    return this.data.byteLength
  }

  tell() {
    return this.offset
  }

  seek(offset: number) {
    this.offset = Math.max(0, offset)
  }

  skip(offset: number) {
    this.seek(this.tell() + offset)
  }

  b() {
    const r = this.data.getInt8(this.offset)
    this.skip(1)
    return r
  }

  ub() {
    const r = this.data.getUint8(this.offset)
    this.skip(1)
    return r
  }

  s(isLittleEndian = true) {
    const r = this.data.getInt16(this.offset, isLittleEndian)
    this.skip(2)
    return r
  }

  us(isLittleEndian = true) {
    const r = this.data.getUint16(this.offset, isLittleEndian)
    this.skip(2)
    return r
  }

  i(isLittleEndian = true) {
    const r = this.data.getInt32(this.tell(), isLittleEndian)
    this.skip(4)
    return r
  }

  ui(isLittleEndian = true) {
    const r = this.data.getUint32(this.tell(), isLittleEndian)
    this.skip(4)
    return r
  }

  f(isLittleEndian = true) {
    const r = this.data.getFloat32(this.tell(), isLittleEndian)
    this.skip(4)
    return r
  }

  lf(isLittleEndian = true) {
    const r = this.data.getFloat64(this.tell(), isLittleEndian)
    this.skip(8)
    return r
  }

  str() {
    let t = this.ub()
    let r = ''
    while (t !== 0) {
      r += String.fromCharCode(t)
      t = this.ub()
    }

    return r
  }

  nstr(length: number) {
    let n = length
    if (n < 0) {
      return ''
    }

    let r = ''
    while (n > 0) {
      n -= 1
      const charCode = this.ub()
      if (charCode === 0) {
        break
      }

      r += String.fromCharCode(charCode)
    }

    if (n !== 0) {
      this.skip(n)
    }

    return r
  }

  arr<T>(length: number, f: () => T) {
    let n = length
    f.bind(this)
    const r: T[] = []
    while (n-- > 0) {
      r.push(f())
    }

    return r
  }

  arrx(length: number, type: ReaderDataType, nstrlen = 0) {
    switch (type) {
      case ReaderDataType.UByte: {
        const r = new Uint8Array(this.data.buffer, this.tell(), length)
        this.skip(length)
        return r
      }
      case ReaderDataType.Byte: {
        const r = new Int8Array(this.data.buffer, this.tell(), length)
        this.skip(length)
        return r
      }
      case ReaderDataType.UShort: {
        const r = new Uint16Array(this.data.buffer, this.tell(), length)
        this.skip(length * 2)
        return r
      }
      case ReaderDataType.Short: {
        const r = new Int16Array(this.data.buffer, this.tell(), length)
        this.skip(length * 2)
        return r
      }
      case ReaderDataType.UInt: {
        const r = new Uint32Array(this.data.buffer, this.tell(), length)
        this.skip(length * 4)
        return r
      }
      case ReaderDataType.Int: {
        const r = new Int32Array(this.data.buffer, this.tell(), length)
        this.skip(length * 4)
        return r
      }
      case ReaderDataType.Float: {
        const r = new Float32Array(this.data.buffer, this.tell(), length)
        this.skip(length * 4)
        return r
      }
      case ReaderDataType.Double: {
        const r = new Float64Array(this.data.buffer, this.tell(), length)
        this.skip(length * 8)
        return r
      }
      case ReaderDataType.NString: {
        let n = length
        const r = []
        while (n-- > 0) {
          r.push(this.nstr(nstrlen))
        }
        return r
      }
      case ReaderDataType.String: {
        let n = length
        const r = []
        while (n-- > 0) {
          r.push(this.str())
        }
        return r
      }
    }
  }
}
