import { Reducer } from 'redux'
import { GeneralAction } from './actionTypes'

export type GeneralState = {
  title: string
}

const initialState: GeneralState = {
  title: ''
}

export const generalReducer: Reducer<GeneralState, GeneralAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'GENERAL_TITLE_CHANGE': {
      return {
        ...state,
        title: action.title
      }
    }
  }

  return state
}
