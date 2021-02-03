import { Game } from './Game'
import { Config } from './Config'
import { PlayerInterface } from './PlayerInterface/index'

const VERSION = '1'

class HLV {
  public static readonly VERSION = VERSION

  private game: Game

  constructor(game: Game) {
    this.game = game
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

namespace HLViewer {
  export function init(rootSelector: string, params: { paths: { replays: string; maps: string; sounds: string; skies: string; wads: string; base: string } }) {
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
      game.draw()

      return new HLV(game)
    }

    return null
  }
}

export default HLViewer
