type TitleChangeListener = (newVal: string) => void

export class Store {
  private title: string = ''

  private onTitleChangeListeners: TitleChangeListener[] = []

  addTitleChangeListener = (listener: TitleChangeListener) => {
    this.onTitleChangeListeners.push(listener)
  }

  removeTitleChangeListener = (listener: TitleChangeListener) => {
    const idx = this.onTitleChangeListeners.indexOf(listener)
    if (idx > -1) {
      this.onTitleChangeListeners.splice(idx, 1)
    }
  }

  getTitle() {
    return this.title
  }

  setTitle(title: string) {
    this.title = title
    this.onTitleChangeListeners.forEach(a => a(title))
  }
}

export function createStore() {
  return new Store()
}
