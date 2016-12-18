import {describe, it} from 'mocha'
import {assert} from 'chai'
import Reader from '../src/reader.js'

describe('Reader:', () => {
    describe('given an ArrayBuffer', () => {
        describe('when Reader is created', () => {
            it('then initialy tell() must return 0', () => {
                let buffer = new ArrayBuffer(4)
                let arr = new Uint8Array(buffer)
                arr[0] = 1; arr[1] = 2; arr[2] = 3; arr[3] = 4

                let reader = new Reader(buffer)

                assert.equal(reader.tell(), 0)
            })

            it('and length() must return arraybuffer size in bytes', () => {
                let buffer = new ArrayBuffer(4)
                let arr = new Uint8Array(buffer)
                arr[0] = 1; arr[1] = 2; arr[2] = 3; arr[3] = 4

                let reader = new Reader(buffer)

                assert.equal(reader.length(), 4)
            })

            it('loop test arrays of different sizes')
        })
    })

    describe('given a parameter that is not an ArrayBuffer', () => {
        describe('when creating Reader', () => {
            it('then Reader constructor should throw Error', () => {
                let notArrayBuffer = []

                assert.throws(() => new Reader(notArrayBuffer))
            })
        })
    })

    let createArrayBuffer = (a) => {
        let buffer = new ArrayBuffer(a.length)
        let array = new Uint8Array(buffer)
        for (let i = 0; i < a.length; ++i) {
            array[i] = a[i]
        }
        return buffer
    }

    describe('given an ArrayBuffer holding uint values', () => {
        describe('when reading content as unsigned bytes', () => {
            it('then values must match and offset must be increased by one after each read', () => {
                let array = [1,2,3,4]
                let buffer = createArrayBuffer(array)
                let reader = new Reader(buffer)

                for (let i = 0; i < 4; ++i) {
                    assert.equal(reader.tell(), i)
                    assert.equal(reader.ub(), array[i])
                }
            })
        })

        describe('when reading past length', () => {
            it('then tell must not go over length', () => {
                let buffer = createArrayBuffer([42])

                let reader = new Reader(buffer)

                reader.ub()
                assert.equal(reader.tell(), 0)
                reader.ub()
                assert.equal(reader.tell(), 0)
            })
        })
    })

    describe('given a zero-length ArrayBuffer', () => {
        describe('when creating Reader', () => {
            it('then must throw', () => {
                let buffer = new ArrayBuffer(0)

                assert.throws(() => new Reader(buffer))
            })
        })
    })
})