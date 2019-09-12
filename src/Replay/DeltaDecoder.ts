import { DeltaType } from './DeltaType'

export type DeltaDecoder = {
  name: string
  bits: number
  divisor: number
  flags: DeltaType
}[]

export type DeltaDecoderTable = { [name: string]: DeltaDecoder }
