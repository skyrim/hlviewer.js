import { createStore, combineReducers } from 'redux'
import { generalReducer, GeneralState } from './General'

export type AppState = {
  general: GeneralState
}

const appReducer = combineReducers({
  general: generalReducer
})

export function createAppStore() {
  return createStore(appReducer)
}
