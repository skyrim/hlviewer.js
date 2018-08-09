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

// ;(async function() {
//   const spr = await Sprite.loadFromUrl('/res/sprites/logo.spr', () => {})
//   const w = spr.header.width
//   const h = spr.header.height

//   for (let j = 0; j < spr.header.frameCount; ++j) {
//     const el = document.createElement('canvas')
//     document.body.appendChild(el)
//     const ctx = el.getContext('2d')
//     el.width = w
//     el.height = h
//     el.style.width = `${w}px`
//     el.style.height = `${h}px`
//     if (!ctx) return
//     const img = ctx.createImageData(w, h)
//     for (let i = 0; i < w * h * 4; ++i) {
//       img.data[i] = spr.frames[j].data[i]
//     }
//     ctx.putImageData(img, 0, 0)
//   }

//   console.log(spr)
// }());