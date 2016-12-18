import {describe, it} from 'mocha'
import {assert} from 'chai'
import Time from '../src/time.js'

describe('Time', () => {
    describe('when now() is called', () => {
        it('will return positive integer number', () => {
            var now = Time.now()

            assert.typeOf(now, 'number')
            assert.isAbove(now, 0)
        })
    })

    describe('when calling now and then another now after 30ms', () => {
        it('then difference of will be 30 + epsilon ms', (done) => {
            var t1 = Time.now()
            setTimeout(() => {
                var t2 = Time.now()
                
                assert.closeTo(t2 - t1, 30, 2)

                done()
            }, 30)
        })
    })
})