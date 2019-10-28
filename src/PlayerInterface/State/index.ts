import { createStore, combineReducers } from 'redux'
import { generalReducer, GeneralState } from './General'
import { loadingReducer, LoadingState } from './Loading'

export type AppState = {
  general: GeneralState,
  loading: LoadingState
}

const appReducer = combineReducers({
  general: generalReducer,
  loading: loadingReducer
})

export function createAppStore() {
  return createStore(appReducer)
}
