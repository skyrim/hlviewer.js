import { h, render } from 'preact'
import { Game } from '../Game'
import { Root } from './Root'

export class PlayerInterface {
  private game: Game
  private rootNode: Element

  constructor(game: Game) {
    this.game = game
  }

  getRootNode() {
    return this.rootNode
  }

  draw(selector: string) {
    const element = document.querySelector(selector)
    if (element) {
      this.rootNode = element
      render(<Root game={this.game} root={this.rootNode} />, element)
    }
    // TODO: else throw
  }
}
