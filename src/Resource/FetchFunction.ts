import { Observable } from './Observable'
import { ResourceTypes } from './ResourceTypes'

export type FetchFunction = (
  type: ResourceTypes,
  file: string
) => Observable<ArrayBuffer>
