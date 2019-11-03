import { Observable } from './Observable'
import { ResourceType } from './ResourceType'

export type FetchFunction = (
  type: ResourceType,
  file: string,
  wads: string[]
) => Observable<ArrayBuffer>
