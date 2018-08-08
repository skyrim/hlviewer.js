import defaultsDeep from 'lodash-es/defaultsDeep'
import { PlayerInterface } from './PlayerInterface/index'
import { Game, Config } from './Game'

declare var VERSION: string

class HLViewer {
  static readonly VERSION = VERSION

  game: Game
  interface: PlayerInterface

  constructor(rootSelector: string, params: Config | string) {
    const basePath = typeof params === 'string' ? params : ''
    const config = defaultsDeep(
      {
        paths: {
          base: `${basePath}`,
          replays: `${basePath}/replays`,
          maps: `${basePath}/maps`,
          wads: `${basePath}/wads`,
          skies: `${basePath}/skies`,
          sounds: `${basePath}/sounds`
        }
      },
      params
    )

    this.game = new Game(config)
    this.interface = new PlayerInterface(this.game)
    this.interface.draw(rootSelector)
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

// had to do this instead of "export default class"
let wnd: any = window
wnd.HLViewer = HLViewer
