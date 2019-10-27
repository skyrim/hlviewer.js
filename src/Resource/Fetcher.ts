import { Observable } from './Observable'
import { ResourceTypes } from './ResourceTypes'

export type FetcherObservable = number

export type Fetcher = (
  type: ResourceTypes,
  file: string
) => Observable<ArrayBuffer>
