import { h, render } from 'preact'
import { Game } from '../Game'
import { Root } from './Root'

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
    render(<Root game={this.game} root={this.rootNode} />, this.rootNode)
  }
}
