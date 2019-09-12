import { Reader } from '../Reader'
import { ReplayState } from './ReplayState'

export class ReplayChunk {
  state: ReplayState
  startTime: number
  timeLength: number
  data: Uint8Array | null
  reader: Reader | null

  constructor(initialState: ReplayState, startTime: number) {
    this.state = initialState.clone()
    this.startTime = startTime
    this.timeLength = 10
    this.data = null
    this.reader = null
  }

  setData(data: Uint8Array) {
    this.data = new Uint8Array(data.length)
    for (let i = 0; i < data.length; ++i) {
      this.data[i] = data[i]
    }

    this.reader = new Reader(this.data.buffer as ArrayBuffer)
  }
}
