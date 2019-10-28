import { LoadingAdd, LoadingProgress, LoadingClear } from './actionTypes'

export const loadingAdd = (resource: {
  type: string
  name: string
}): LoadingAdd => ({
  type: 'LOADING_ADD',
  resource
})

export const loadingProgress = (
  resource: { type: string; name: string },
  progress: number
): LoadingProgress => ({
  type: 'LOADING_PROGRESS',
  resource,
  progress
})

export const loadingClear = (): LoadingClear => ({ type: 'LOADING_CLEAR' })
