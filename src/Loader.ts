import { EventEmitter } from 'events'
import * as Path from 'path'
import { Game } from './Game'
import { Bsp, BspParser } from './Parsers/BspParser'
import { Replay } from './Replay'
import { Sound } from './Sound'
import { Tga } from './Parsers/Tga'
import { Wad } from './Parsers/Wad'
import { ProgressCallback } from './Xhr'
import { Sprite } from './Parsers/Sprite'

enum LoadItemStatus {
  Loading = 1,
  Skipped = 2,
  Error = 3,
  Done = 4
}

class LoadItemBase<T> {
  name: string
  progress: number
  status: LoadItemStatus
  data: T | null

  constructor(name: string) {
    this.name = name
    this.progress = 0
    this.status = LoadItemStatus.Loading
    this.data = null
  }

  isLoading() {
    return this.status === LoadItemStatus.Loading
  }

  skip() {
    this.status = LoadItemStatus.Skipped
  }

  isSkipped() {
    return this.status === LoadItemStatus.Skipped
  }

  // TODO: Add error reason
  error() {
    this.status = LoadItemStatus.Error
  }

  isError() {
    return this.status === LoadItemStatus.Error
  }

  done(data: T) {
    this.status = LoadItemStatus.Done
    this.data = data
  }

  isDone() {
    return this.status === LoadItemStatus.Done
  }
}

class LoadItemReplay extends LoadItemBase<any> {
  type: 'replay' = 'replay'
}

class LoadItemBsp extends LoadItemBase<Bsp> {
  type: 'bsp' = 'bsp'
}

class LoadItemSky extends LoadItemBase<Tga> {
  type: 'sky' = 'sky'
}

class LoadItemWad extends LoadItemBase<Wad> {
  type: 'wad' = 'wad'
}

class LoadItemSound extends LoadItemBase<Sound> {
  type: 'sound' = 'sound'
}

class LoadItemSprite extends LoadItemBase<Sprite> {
  type: 'sprite' = 'sprite'
}

export type LoadItem = LoadItemReplay | LoadItemBsp | LoadItemSky | LoadItemWad | LoadItemSound | LoadItemSprite

class Loader {
  game: Game

  replay?: LoadItemReplay
  map?: LoadItemBsp
  skies: LoadItemSky[]
  wads: LoadItemWad[]
  sounds: LoadItemSound[]
  sprites: { [name: string]: LoadItemSprite } = {}
  events: EventEmitter

  constructor(game: Game) {
    this.game = game

    this.replay = undefined
    this.map = undefined
    this.skies = []
    this.wads = []
    this.sounds = []

    this.events = new EventEmitter()
    this.events.addListener('error', (err: any) => {
      console.error(err)
    })
  }

  clear() {
    this.replay = undefined
    this.map = undefined
    this.skies.length = 0
    this.wads.length = 0
    this.sounds.length = 0
    this.sprites = {}
  }

  checkStatus() {
    if (this.replay && !this.replay.isDone()) {
      return
    }

    if (this.map && !this.map.isDone()) {
      return
    }

    for (let i = 0; i < this.skies.length; ++i) {
      if (this.skies[i].isLoading()) {
        return
      }
    }

    for (let i = 0; i < this.wads.length; ++i) {
      if (this.wads[i].isLoading()) {
        return
      }
    }

    for (let i = 0; i < this.sounds.length; ++i) {
      if (this.sounds[i].isLoading()) {
        return
      }
    }

    const sprites = Object.entries(this.sprites)
    for (let i = 0; i < sprites.length; ++i) {
      if (sprites[i][1].isLoading()) {
        return
      }
    }

    this.events.emit('loadall', this)
  }

  load(name: string) {
    const extension = Path.extname(name)
    if (extension === '.dem') {
      this.loadReplay(name)
    } else if (extension === '.bsp') {
      this.loadMap(name)
    } else {
      this.events.emit('error', 'Invalid file extension', name)
    }
  }

  async loadReplay(name: string) {
    this.replay = new LoadItemReplay(name)
    this.events.emit('loadstart', this.replay)

    const progressCbk: ProgressCallback = (_1, progress) => {
      if (this.replay) {
        this.replay.progress = progress
      }

      this.events.emit('progress', this.replay)
    }

    const replayPath = this.game.config.paths.replays
    const replay = await Replay.loadFromUrl(
      `${replayPath}/${name}`,
      progressCbk
    ).catch((err: any) => {
      if (this.replay) {
        this.replay.error()
      }

      this.events.emit('error', err, this.replay)
    })

    if (!this.replay || !replay) {
      return
    }

    this.replay.done(replay)

    this.loadMap(replay.maps[0].name + '.bsp')

    const sounds = replay.maps[0].resources.sounds
    sounds.forEach((sound: any) => {
      if (sound.used) {
        this.loadSound(sound.name, sound.index)
      }
    })

    this.events.emit('load', this.replay)
    this.checkStatus()
  }

  async loadMap(name: string) {
    this.map = new LoadItemBsp(name)
    this.events.emit('loadstart', this.map)

    const progressCbk: ProgressCallback = (_1, progress) => {
      if (this.map) {
        this.map.progress = progress
      }

      this.events.emit('progress', this.map)
    }

    const mapsPath = this.game.config.paths.maps
    const map = await BspParser.loadFromUrl(
      name,
      `${mapsPath}/${name}`,
      progressCbk
    ).catch(err => {
      if (this.map) {
        this.map.error()
      }

      this.events.emit('error', err, this.map)
    })

    if (!map) {
      return
    }

    this.map.done(map)

    map.entities
      .map((e: any) => {
        if (typeof e.model === 'string' && e.model.indexOf('.spr') > -1) {
          return e.model as string
        }
        return undefined
      })
      .filter(
        (a: string | undefined, pos: number, arr: (string | undefined)[]) =>
          a && arr.indexOf(a) === pos
      )
      .forEach((a: string) => this.loadSprite(a))

    const skyname = map.entities[0].skyname
    if (skyname) {
      ;['bk', 'dn', 'ft', 'lf', 'rt', 'up']
        .map(a => `${skyname}${a}.tga`)
        .forEach(a => this.loadSky(a))
    }

    // check if there is at least one missing texture
    // if yes then load wad files (textures should be there)
    if (map.textures.find(a => a.isExternal)) {
      const wads = map.entities[0].wad
      const wadPromises = wads.map((w: string) => this.loadWad(w))
      await Promise.all(wadPromises)
    }

    this.events.emit('load', this.map)
    this.checkStatus()
  }

  async loadSprite(name: string) {
    const item = new LoadItemSprite(name)
    this.sprites[name] = item
    this.events.emit('loadstart', item)

    const progressCbk: ProgressCallback = (_1, progress) => {
      item.progress = progress
      this.events.emit('progress', item)
    }

    const sprite = await Sprite.loadFromUrl(
      `${this.game.config.paths.base}/${name}`,
      progressCbk
    ).catch((err: any) => {
      item.error()
      this.events.emit('error', err, item)
      this.checkStatus()
    })
    if (!sprite) {
      return
    }

    item.done(sprite)
    this.events.emit('load', item)
    this.checkStatus()
  }

  async loadSky(name: string) {
    const item = new LoadItemSky(name)
    this.skies.push(item)
    this.events.emit('loadstart', item)

    const progressCbk: ProgressCallback = (_1, progress) => {
      item.progress = progress
      this.events.emit('progress', item)
    }

    const skiesPath = this.game.config.paths.skies
    const skyImage = await Tga.loadFromUrl(
      `${skiesPath}/${name}`,
      progressCbk
    ).catch((err: any) => {
      item.error()
      this.events.emit('error', err, item)
      this.checkStatus()
    })

    if (!skyImage) {
      return
    }

    item.done(skyImage)
    this.events.emit('load', item)
    this.checkStatus()
  }

  async loadWad(name: string) {
    const wadItem = new LoadItemWad(name)
    this.wads.push(wadItem)
    this.events.emit('loadstart', wadItem)

    const progressCbk: ProgressCallback = (_1, progress) => {
      wadItem.progress = progress
      this.events.emit('progress', wadItem)
    }

    const wadsPath = this.game.config.paths.wads
    const wad = await Wad.loadFromUrl(`${wadsPath}/${name}`, progressCbk).catch(
      (err: any) => {
        wadItem.error()
        this.events.emit('error', err, wadItem)
        this.checkStatus()
      }
    )
    if (!this.map || !wad || !this.map.data) {
      return
    }

    wadItem.done(wad)

    const map = this.map.data
    const cmp = (a: any, b: any) => a.toLowerCase() === b.toLowerCase()
    wad.entries.forEach(entry => {
      if (entry.type !== 'texture') {
        return
      }

      map.textures.forEach(texture => {
        if (cmp(entry.name, texture.name)) {
          texture.width = entry.width
          texture.height = entry.height
          texture.data = entry.data
        }
      })
    })

    this.events.emit('load', wadItem)
    this.checkStatus()
  }

  async loadSound(name: string, index: number) {
    const sound = new LoadItemSound(name)
    this.sounds.push(sound)
    this.events.emit('loadstart', sound)

    const progressCbk: ProgressCallback = (_1, progress) => {
      sound.progress = progress
      this.events.emit('progress', sound)
    }

    const soundsPath = this.game.config.paths.sounds
    const data = await Sound.loadFromUrl(
      `${soundsPath}/${name}`,
      progressCbk
    ).catch((err: any) => {
      sound.error()
      this.events.emit('error', err, sound)
      this.checkStatus()
    })

    if (!data) {
      return
    }

    data.index = index
    data.name = name
    sound.done(data)
    this.events.emit('load', sound)
    this.checkStatus()
  }

  addLoadStartListener(listener: (item: LoadItem) => void) {
    this.events.addListener('loadstart', listener)
  }

  removeLoadStartListener(listener: (item: LoadItem) => void) {
    this.events.removeListener('loadstart', listener)
  }

  addProgressListener(listener: (item: LoadItem) => void) {
    this.events.addListener('progress', listener)
  }

  removeProgressListener(listener: (item: LoadItem) => void) {
    this.events.removeListener('progress', listener)
  }
}

export { Loader }
