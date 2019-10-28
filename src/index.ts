import { Game } from './Game'
import { Config } from './Config'
import { PlayerInterface } from './PlayerInterface'

declare var VERSION: string

class HLV {
  public static readonly VERSION = VERSION

  private ui: PlayerInterface
  private game: Game

  constructor(game: Game, ui: PlayerInterface) {
    this.ui = ui
    this.game = game
  }

  load(name: string) {
    this.game.load(name)
  }

  setTitle(title: string) {
    this.ui.setTitle(title + '!')
  }

  getTitle() {
    return this.ui.getTitle()
  }
}

namespace HLViewer {
  export function init(rootSelector: string, params: Config | string) {
    const node = document.querySelector(rootSelector)
    if (!node) {
      return null
    }

    const config = Config.init(params)
    const result = Game.init(config)
    if (result.status === 'success') {
      const game = result.game
      const ui = new PlayerInterface(game, node)

      ui.draw()
      requestAnimationFrame(game.draw)

      return new HLV(game, ui)
    }

    return null
  }
}

export = HLViewer
