export default class Reader {
    constructor(data) {
        if (data.byteLength === 0) {
            throw new Error('ArrayBuffer must have size greater than zero')
        }

        this.data = new DataView(data)
        this.offset = 0
    }

    length() {
        return this.data.byteLength
    }

    tell() {
        return this.offset
    }

    seek(offset) {
        if (offset < 0) {
            offset = 0
        } else if (offset >= this.length()) {
            offset = this.length() - 1
        }

        this.offset = offset
    }

    skip(offset) {
        this.seek(this.tell() + offset)
    }

    b() {
        let r = this.data.getInt8(this.offset)
        this.skip(1)
        return r
    }

    ub() {
        let r = this.data.getUint8(this.offset)
        this.skip(1)
        return r
    }

    s(isLittleEndian = true) {
        let r = this.data.getInt16(this.offset, isLittleEndian)
        this.skip(2)
        return r
    }

    us(isLittleEndian = true) {
        let r = this.data.getUint16(this.offset, isLittleEndian)
        this.skip(2)
        return r
    }

    i(isLittleEndian = true) {
        let r = this.data.getInt32(this.tell(), isLittleEndian)
        this.skip(4)
        return r
    }

    ui(isLittleEndian = true) {
        let r = this.data.getUint32(this.tell(), isLittleEndian)
        this.skip(4)
        return r
    }

    f(isLittleEndian = true) {
        let r = this.data.getFloat32(this.tell(), isLittleEndian)
        this.skip(4)
        return r
    }

    lf(isLittleEndian = true) {
        let r = this.data.getFloat64(this.tell(), isLittleEndian)
        this.skip(8)
        return r
    }

    str() {
        let t, r = ''
        while ((t = this.ub()) !== 0) {
            r += String.fromCharCode(t)
        }

        return r
    }

    nstr(n) {
        let t, r = ''
        while ((n-- > 0) && ((t = this.ub()) !== 0)) {
            r += String.fromCharCode(t)
        }

        if (n > 0) {
            this.skip(n)
        }

        return r
    }

    arr(n, f) {
        f.bind(this)
        let r = []
        while (n-- > 0) {
            r.push(f())
        }

        return r
    }
}