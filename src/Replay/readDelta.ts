import { DeltaType } from './DeltaType'
import type { BitStream } from '../BitReader'
import type { DeltaDecoder } from './DeltaDecoder'

export function readDelta(bs: BitStream, dd: DeltaDecoder) {
  const data: { [name: string]: any } = {}

  const maskBitCount = bs.readBits(3)
  const maskBits = []
  for (let i = 0; i < maskBitCount; ++i) {
    maskBits.push(bs.readBits(8))
  }

  let brk = false
  for (let i = 0; i < maskBitCount; ++i) {
    for (let j = 0; j < 8; ++j) {
      const index = j + i * 8
      if (index === dd.length) {
        brk = true
        break
      }

      if (maskBits[i] & (1 << j)) {
        if (dd[index].flags & DeltaType.DT_BYTE) {
          if (dd[index].flags & DeltaType.DT_SIGNED) {
            const sign = bs.readBits(1) ? -1 : 1
            const value = bs.readBits(dd[index].bits - 1)
            const divisor = dd[index].divisor
            data[dd[index].name] = (sign * value) / divisor
          } else {
            const value = bs.readBits(dd[index].bits)
            const divisor = dd[index].divisor
            data[dd[index].name] = value / divisor
          }
        } else if (dd[index].flags & DeltaType.DT_SHORT) {
          if (dd[index].flags & DeltaType.DT_SIGNED) {
            const sign = bs.readBits(1) ? -1 : 1
            const value = bs.readBits(dd[index].bits - 1)
            const divisor = dd[index].divisor
            data[dd[index].name] = (sign * value) / divisor
          } else {
            const value = bs.readBits(dd[index].bits)
            const divisor = dd[index].divisor
            data[dd[index].name] = value / divisor
          }
        } else if (dd[index].flags & DeltaType.DT_INTEGER) {
          if (dd[index].flags & DeltaType.DT_SIGNED) {
            const sign = bs.readBits(1) ? -1 : 1
            const value = bs.readBits(dd[index].bits - 1)
            const divisor = dd[index].divisor
            data[dd[index].name] = (sign * value) / divisor
          } else {
            const value = bs.readBits(dd[index].bits)
            const divisor = dd[index].divisor
            data[dd[index].name] = value / divisor
          }
        } else if (
          dd[index].flags & DeltaType.DT_FLOAT ||
          dd[index].flags & DeltaType.DT_TIMEWINDOW_8 ||
          dd[index].flags & DeltaType.DT_TIMEWINDOW_BIG
        ) {
          if (dd[index].flags & DeltaType.DT_SIGNED) {
            const sign = bs.readBits(1) ? -1 : 1
            const value = bs.readBits(dd[index].bits - 1)
            const divisor = dd[index].divisor
            data[dd[index].name] = (sign * value) / divisor
          } else {
            const value = bs.readBits(dd[index].bits)
            const divisor = dd[index].divisor
            data[dd[index].name] = value / divisor
          }
        } else if (dd[index].flags & DeltaType.DT_ANGLE) {
          const value = bs.readBits(dd[index].bits)
          const multiplier = 360 / (1 << dd[index].bits)
          data[dd[index].name] = value * multiplier
        } else if (dd[index].flags & DeltaType.DT_STRING) {
          data[dd[index].name] = bs.readString()
        }
      }
    }

    if (brk) {
      break
    }
  }

  return data
}

const initialDeltaDecoders = {
  delta_description_t: [
    {
      name: 'flags',
      bits: 32,
      divisor: 1,
      flags: DeltaType.DT_INTEGER
    },
    {
      name: 'name',
      bits: 8,
      divisor: 1,
      flags: DeltaType.DT_STRING
    },
    {
      name: 'offset',
      bits: 16,
      divisor: 1,
      flags: DeltaType.DT_INTEGER
    },
    {
      name: 'size',
      bits: 8,
      divisor: 1,
      flags: DeltaType.DT_INTEGER
    },
    {
      name: 'bits',
      bits: 8,
      divisor: 1,
      flags: DeltaType.DT_INTEGER
    },
    {
      name: 'divisor',
      bits: 32,
      divisor: 4000,
      flags: DeltaType.DT_FLOAT
    },
    {
      name: 'preMultiplier',
      bits: 32,
      divisor: 4000,
      flags: DeltaType.DT_FLOAT
    }
  ]
}

export const getInitialDeltaDecoders = (): {
  [name: string]: DeltaDecoder
} => ({ ...initialDeltaDecoders })
