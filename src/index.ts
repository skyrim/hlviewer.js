import { Game } from './Game'
import { Config } from './Config'
import { PlayerInterface } from './PlayerInterface/index'

declare var VERSION: string

export = class HLViewer {
  static readonly VERSION = VERSION

  game: Game
  interface: PlayerInterface

  constructor(rootSelector: string, params: Config | string) {
    const config = Config.init(params)
    this.game = new Game(config)
    this.interface = new PlayerInterface(this.game)
    this.interface.draw(rootSelector)
    this.game.draw()
  }

  load(name: string) {
    this.game.load(name)
  }

  setTitle(title: string) {
    this.game.setTitle(title)
  }

  getTitle() {
    return this.game.getTitle()
  }
}
