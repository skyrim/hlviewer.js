import { h, render } from 'preact'
import { Provider } from 'react-redux'
import { Root } from './Root'
import { Game } from '../Game'
import { createAppStore } from './State'
import { changeTitle } from './State/General/actions'

export class PlayerInterface {
  private game: Game
  private store: ReturnType<typeof createAppStore>
  private rootNode: Element

  constructor(game: Game, rootNode: Element) {
    this.store = createAppStore()
    this.game = game
    this.rootNode = rootNode
  }

  getStore() {
    return this.store
  }

  setTitle(title: string) {
    this.store.dispatch(changeTitle(title))
  }

  getTitle() {
    return this.store.getState().general.title
  }

  draw() {
    render(
      <Provider store={this.store}>
        <Root game={this.game} root={this.rootNode} />
      </Provider>,
      this.rootNode
    )
  }
}
