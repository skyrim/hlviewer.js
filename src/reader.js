export const TYPE_UB   = 0
export const TYPE_B    = 1
export const TYPE_US   = 2
export const TYPE_S    = 3
export const TYPE_UI   = 4
export const TYPE_I    = 5
export const TYPE_F    = 6
export const TYPE_LF   = 7
export const TYPE_NSTR = 8
export const TYPE_STR  = 9

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
        this.offset = Math.max(0, offset)
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

    arrx(n, type, nstrlen = 0) {
        let r

        switch (type) {
        case TYPE_UB:
            r = new Uint8Array(this.data.buffer, this.tell(), n)
            this.skip(n)
        break

        case TYPE_B:
            r = new Int8Array(this.data.buffer, this.tell(), n)
            this.skip(n)
        break

        case TYPE_US:
            r = new Uint16Array(this.data.buffer, this.tell(), n)
            this.skip(n * 2)
        break

        case TYPE_S:
            r = new Int16Array(this.data.buffer, this.tell(), n)
            this.skip(n * 2)
        break

        case TYPE_UI:
            r = new Uint32Array(this.data.buffer, this.tell(), n)
            this.skip(n * 4)
        break

        case TYPE_I:
            r = new Int32Array(this.data.buffer, this.tell(), n)
            this.skip(n * 4)
        break

        case TYPE_F:
            r = new Float32Array(this.data.buffer, this.tell(), n)
            this.skip(n * 4)
        break

        case TYPE_LF:
            r = new Float64Array(this.data.buffer, this.tell(), n)
            this.skip(n * 8)
        break

        case TYPE_NSTR:
            r = []
            while (n-- > 0) {
                r.push(r.nstr(nstrlen))
            }
        break

        case TYPE_STR:
            r = []
            while (n-- > 0) {
                r.push(r.str())
            }
        break
        }

        return r
    }
}