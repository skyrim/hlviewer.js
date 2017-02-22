export class BitView {
    constructor(buffer) {
        if (!(buffer instanceof ArrayBuffer)) {
            throw new Error('Must specify a valid ArrayBuffer or Buffer.')
        }

        this._view = new Uint8Array(buffer, 0, buffer.byteLength)
    }

    getBits(offset, bits, signed) {
        let available = (this._view.length * 8 - offset)

        if (bits > available) {
            throw new Error('Cannot get ' + bits + ' bit(s) from offset ' + offset + ', ' + available + ' available')
        }

        let value = 0
        for (let i = 0; i < bits;) {
            let remaining = bits - i
            let bitOffset = offset & 7
            let currentByte = this._view[offset >> 3]

            // the max number of bits we can read from the current byte
            let read = Math.min(remaining, 8 - bitOffset)

            // create a mask with the correct bit width
            let mask = (1 << read) - 1
            // shift the bits we want to the start of the byte and mask of the rest
            let readBits = (currentByte >> bitOffset) & mask
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

    getInt8(offset) {
        return this.getBits(offset, 8, true)
    }

    getUint8(offset) {
        return this.getBits(offset, 8, false)
    }

    getInt16(offset) {
        return this.getBits(offset, 16, true)
    }

    getUint16(offset) {
        return this.getBits(offset, 16, false)
    }

    getInt32(offset) {
        return this.getBits(offset, 32, true)
    }

    getUint32(offset) {
        return this.getBits(offset, 32, false)
    }

    getFloat32(offset) {
        BitView._scratch.setUint32(0, this.getUint32(offset))
        return BitView._scratch.getFloat32(0)
    }

    getFloat64(offset) {
        BitView._scratch.setUint32(0, this.getUint32(offset))
        // DataView offset is in bytes.
        BitView._scratch.setUint32(4, this.getUint32(offset+32))
        return BitView._scratch.getFloat64(0)
    }
}

BitView._scratch = new DataView(new ArrayBuffer(8))

Object.defineProperty(BitView.prototype, 'buffer', {
	get: () => new ArrayBuffer(this._view),
	enumerable: true,
	configurable: false
})

Object.defineProperty(BitView.prototype, 'byteLength', {
	get: () => this._view.length,
	enumerable: true,
	configurable: false
})
function stringToByteArray(str) { // https://gist.github.com/volodymyr-mykhailyk/2923227
	let b = [], i, unicode
	for (i = 0; i < str.length; i++) {
		unicode = str.charCodeAt(i)
		// 0x00000000 - 0x0000007f -> 0xxxxxxx
		if (unicode <= 0x7f) {
			b.push(unicode)
			// 0x00000080 - 0x000007ff -> 110xxxxx 10xxxxxx
		} else if (unicode <= 0x7ff) {
			b.push((unicode >> 6) | 0xc0)
			b.push((unicode & 0x3F) | 0x80)
			// 0x00000800 - 0x0000ffff -> 1110xxxx 10xxxxxx 10xxxxxx
		} else if (unicode <= 0xffff) {
			b.push((unicode >> 12) | 0xe0)
			b.push(((unicode >> 6) & 0x3f) | 0x80)
			b.push((unicode & 0x3f) | 0x80)
			// 0x00010000 - 0x001fffff -> 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
		} else {
			b.push((unicode >> 18) | 0xf0)
			b.push(((unicode >> 12) & 0x3f) | 0x80)
			b.push(((unicode >> 6) & 0x3f) | 0x80)
			b.push((unicode & 0x3f) | 0x80)
		}
	}

	return b
}

export class BitStream {
    constructor(source) {
        if (!(source instanceof ArrayBuffer)) {
            throw new Error('Buffer must be instanceof ArrayBuffer')
        }

        this._view = new BitView(source, 0, source.byteLength)

        this._index = 0
    }

    readBits(bits, signed) {
        let val = this._view.getBits(this._index, bits, signed)
        this._index += bits
        return val
    }

    readInt8() {
        let val = this._view.getInt8(this._index)
        this._index += 8
        return val
    }

    readUint8() {
        let val = this._view.getUint8(this._index)
        this._index += 8
        return val
    }

    readInt16() {
        let val = this._view.getInt16(this._index)
        this._index += 16
        return val
    }

    readUint16() {
        let val = this._view.getUint16(this._index)
        this._index += 16
        return val
    }

    readInt32() {
        let val = this._view.getInt32(this._index)
        this._index += 32
        return val
    }

    readUint32() {
        let val = this._view.getUint32(this._index)
        this._index += 32
        return val
    }

    readFloat32() {
        let val = this._view.getFloat32(this._index)
        this._index += 32
        return val
    }

    readFloat64() {
        let val = this._view.getFloat64(this._index)
        this._index += 64
        return val
    }

    readString(bytes, utf8) {
        let i = 0
        let chars = []
        let append = true

        // Read while we still have space available, or until we've
        // hit the fixed byte length passed in.
        while (!bytes || (bytes && i < bytes)) {
            let c = this.readUint8()

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

        let string = String.fromCharCode.apply(null, chars)
        if (utf8) {
            try {
                return decodeURIComponent(escape(string)) // https://stackoverflow.com/a/17192845
            } catch (e) {
                return string
            }
        } else {
            return string
        }
    }
}

Object.defineProperty(BitStream.prototype, 'byteIndex', {
	// Ceil the returned value, over compensating for the amount of
	// bits written to the stream.
	get: () => Math.ceil(this._index / 8),
	enumerable: true,
	configurable: true
})

Object.defineProperty(BitStream.prototype, 'buffer', {
	get: () => new ArrayBuffer(this._view),
	enumerable: true,
	configurable: false
})

Object.defineProperty(BitStream.prototype, 'view', {
	get: () => this._view,
	enumerable: true,
	configurable: false
})