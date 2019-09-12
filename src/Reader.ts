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

  nstr(n: number) {
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

  arr(n: number, f: () => any) {
    f.bind(this)
    const r = []
    while (n-- > 0) {
      r.push(f())
    }

    return r
  }

  arrx(n: number, type: ReaderDataType, nstrlen = 0) {
    let r: any

    switch (type) {
      case ReaderDataType.UByte: {
        r = new Uint8Array(this.data.buffer, this.tell(), n)
        this.skip(n)
        break
      }

      case ReaderDataType.Byte: {
        r = new Int8Array(this.data.buffer, this.tell(), n)
        this.skip(n)
        break
      }

      case ReaderDataType.UShort:
        r = new Uint16Array(this.data.buffer, this.tell(), n)
        this.skip(n * 2)
        break

      case ReaderDataType.Short:
        r = new Int16Array(this.data.buffer, this.tell(), n)
        this.skip(n * 2)
        break

      case ReaderDataType.UInt:
        r = new Uint32Array(this.data.buffer, this.tell(), n)
        this.skip(n * 4)
        break

      case ReaderDataType.Int:
        r = new Int32Array(this.data.buffer, this.tell(), n)
        this.skip(n * 4)
        break

      case ReaderDataType.Float:
        r = new Float32Array(this.data.buffer, this.tell(), n)
        this.skip(n * 4)
        break

      case ReaderDataType.Double:
        r = new Float64Array(this.data.buffer, this.tell(), n)
        this.skip(n * 8)
        break

      case ReaderDataType.NString:
        r = []
        while (n-- > 0) {
          r.push(r.nstr(nstrlen))
        }
        break

      case ReaderDataType.String:
        r = []
        while (n-- > 0) {
          r.push(r.str())
        }
        break
    }

    return r
  }
}
