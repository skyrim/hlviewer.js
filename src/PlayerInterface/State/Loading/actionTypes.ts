export type LoadingAdd = {
  type: 'LOADING_ADD'
  resource: {
    type: string
    name: string
  }
}

export type LoadingProgress = {
  type: 'LOADING_PROGRESS'
  resource: {
    type: string
    name: string
  }
  progress: number
}

export type LoadingClear = {
  type: 'LOADING_CLEAR'
}

export type LoadingAction = LoadingAdd | LoadingProgress | LoadingClear
