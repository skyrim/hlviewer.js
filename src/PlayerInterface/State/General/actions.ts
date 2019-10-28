import { GeneralTitleChange } from './actionTypes'

export const changeTitle = (title: string): GeneralTitleChange => ({
  type: 'GENERAL_TITLE_CHANGE',
  title
})
