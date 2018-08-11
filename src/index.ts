import defaultsDeep from 'lodash-es/defaultsDeep'
import { PlayerInterface } from './PlayerInterface/index'
import { Game, Config } from './Game'
import { Wad } from './Parsers/Wad';

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

;(async function () {
  const wad = await Wad.loadFromUrl('/res/wads/gfx.wad', () => {})
  console.log(wad)

  const entry = wad.entries[4]
  if (entry.type !== 'decal') {
    return
  }

  const w = entry.width
  const h = entry.height

  const el = document.createElement('canvas')	
  document.body.appendChild(el)	
  const ctx = el.getContext('2d')	
  el.width = w	
  el.height = h	
  el.style.width = `${w}px`	
  el.style.height = `${h}px`	
  if (!ctx) return	
  const img = ctx.createImageData(w, h)	
  for (let i = 0; i < w * h * 4; ++i) {	
    img.data[i] = entry.data[i]
  }	
  ctx.putImageData(img, 0, 0)
}())