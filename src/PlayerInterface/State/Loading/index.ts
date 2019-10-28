import { Reducer } from 'redux'
import { LoadingAction } from './actionTypes'

export type LoadingState = {
  groups: {
    [groupName: string]: {
      [itemName: string]: {
        progress: number
      }
    }
  }
}

const initialState: LoadingState = {
  groups: {}
}

export const loadingReducer: Reducer<LoadingState, LoadingAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'LOADING_ADD': {
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.resource.type]: {
            ...state.groups[action.resource.type],
            [action.resource.name]: {
              progress: 0
            }
          }
        }
      }
    }
    case 'LOADING_PROGRESS': {
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.resource.type]: {
            ...state.groups[action.resource.type],
            [action.resource.name]: {
              progress: action.progress
            }
          }
        }
      }
    }
    case 'LOADING_CLEAR': {
      return {
        ...initialState
      }
    }
  }

  return state
}
