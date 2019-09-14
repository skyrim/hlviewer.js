import { h, render } from 'preact'
import { Root } from './Root'
import { Game } from '../Game'
import { createStore, Store } from './store'

export class PlayerInterface {
  private game: Game
  private store: Store
  private rootNode: Element

  constructor(game: Game, rootNode: Element) {
    this.store = createStore()
    this.game = game
    this.rootNode = rootNode
  }

  getStore() {
    return this.store
  }

  draw() {
    render(
      <Root game={this.game} root={this.rootNode} store={this.store} />,
      this.rootNode
    )
  }
}
