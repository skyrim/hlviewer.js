import type { BitStream } from '../BitReader'

export function readCoord(bs: BitStream) {
  const intFlag = bs.readBits(1)
  const fractionFlag = bs.readBits(1)

  if (!intFlag && !fractionFlag) {
    return 0
  }

  const sign = bs.readBits(1)
  let intValue = 0
  let fractionValue = 0
  if (intFlag) {
    intValue = bs.readBits(12)
  }
  if (fractionFlag) {
    fractionValue = bs.readBits(3)
  }

  let value = intValue + fractionValue / 32
  if (sign) {
    value = -value
  }

  return value
}
