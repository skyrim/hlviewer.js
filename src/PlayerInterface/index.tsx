import { render } from 'solid-js/web'
import type { Game } from '../Game'
import { App } from './App'

export class PlayerInterface {
  private game: Game
  private rootNode: Element

  constructor(game: Game, rootNode: Element) {
    this.game = game
    this.rootNode = rootNode
  }

  getRootNode() {
    return this.rootNode
  }

  draw() {
    render(() => <App game={this.game} root={this.rootNode} />, this.rootNode)
  }
}
