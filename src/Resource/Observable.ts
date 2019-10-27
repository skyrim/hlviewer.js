export type Unsubscribe = () => void

export type ProgressCb = (progress: number) => void
export type ErrorCb = (error: Error) => void
export type CompleteCb<T> = (data: T) => void

export type Subscribe<T> = (params: {
  progress?: ProgressCb
  error?: ErrorCb
  complete?: CompleteCb<T>
}) => Unsubscribe

export interface Observable<T> {
  subscribe: Subscribe<T>
}
