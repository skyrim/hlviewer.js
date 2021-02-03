import { Bsp } from './Bsp'
import { Sound } from './Sound'
import { Config } from './Config'
import { Tga } from './Parsers/Tga'
import { Wad } from './Parsers/Wad'
import { extname, evt } from './Util'
import { Replay } from './Replay/Replay'
import { Sprite } from './Parsers/Sprite'
import { ProgressCallback, xhr } from './Xhr'
import { BspParser } from './Parsers/BspParser'

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

export type LoadItem =
  | LoadItemReplay
  | LoadItemBsp
  | LoadItemSky
  | LoadItemWad
  | LoadItemSound
  | LoadItemSprite

export class Loader extends EventTarget {
  config: Config

  replay?: LoadItemReplay
  map?: LoadItemBsp
  skies: LoadItemSky[]
  wads: LoadItemWad[]
  sounds: LoadItemSound[]
  sprites: { [name: string]: LoadItemSprite } = {}

  constructor(config: Config) {
    super()
    this.config = config

    this.replay = undefined
    this.map = undefined
    this.skies = []
    this.wads = []
    this.sounds = []
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

    this.dispatchEvent(evt('loadAll', { detail: { loader: this }  }));
  }

  load(name: string) {
    const extension = extname(name)
    if (extension === '.dem') {
      this.loadReplay(name)
    } else if (extension === '.bsp') {
      this.loadMap(name)
    } else {
      console.error('Invalid file extension', name)
    }
  }

  async loadReplay(name: string) {
    this.replay = new LoadItemReplay(name)

    this.dispatchEvent(evt('loadstart', { detail: { item: this.replay }  }))

    const progressCallback: ProgressCallback = (_1, progress) => {
      if (this.replay) {
        this.replay.progress = progress
      }

      this.dispatchEvent(evt('progress', { detail: { item: this.replay }  }))
    }

    const replayPath = this.config.getReplaysPath()
    const buffer = await xhr(`${replayPath}/${name}`, {
      method: 'GET',
      isBinary: true,
      progressCallback
    }).catch((err: any) => {
      if (this.replay) {
        this.replay.error()
      }
      console.error(err, this.replay)
    })

    if (this.replay.isError()) {
      return
    }

    const replay = await Replay.parseIntoChunks(buffer)
    this.replay.done(replay)

    this.loadMap(replay.maps[0].name + '.bsp')

    const sounds = replay.maps[0].resources.sounds
    sounds.forEach((sound: any) => {
      if (sound.used) {
        this.loadSound(sound.name, sound.index)
      }
    })

    this.dispatchEvent(evt('load', { detail: { item: this.replay }  }))
    this.checkStatus()
  }

  async loadMap(name: string) {
    this.map = new LoadItemBsp(name)
    this.dispatchEvent(evt('loadstart', { detail: { item: this.map }  }))

    const progressCallback: ProgressCallback = (_1, progress) => {
      if (this.map) {
        this.map.progress = progress
      }

      this.dispatchEvent(evt('progress', { detail: { item: this.map }  }))
    }

    const mapsPath = this.config.getMapsPath()
    const buffer = await xhr(`${mapsPath}/${name}`, {
      method: 'GET',
      isBinary: true,
      progressCallback
    }).catch(err => {
      if (this.map) {
        this.map.error()
      }

      console.error(err, this.map)
    })

    if (this.map.isError()) {
      return
    }

    const map = await BspParser.parse(name, buffer)
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
      .forEach(a => a && this.loadSprite(a))

    const skyname = map.entities[0].skyname
    if (skyname) {
      const sides = ['bk', 'dn', 'ft', 'lf', 'rt', 'up']
      sides.map(a => `${skyname}${a}`).forEach(a => this.loadSky(a))
    }

    // check if there is at least one missing texture
    // if yes then load wad files (textures should be there)
    if (map.textures.find(a => a.isExternal)) {
      const wads = map.entities[0].wad
      const wadPromises = wads.map((w: string) => this.loadWad(w))
      await Promise.all(wadPromises)
    }

    this.dispatchEvent(evt('load', { detail: { item: this.map }  }))
    this.checkStatus()
  }

  async loadSprite(name: string) {
    const item = new LoadItemSprite(name)
    this.sprites[name] = item

    this.dispatchEvent(evt('loadstart', { detail: { item }  }))

    const progressCallback: ProgressCallback = (_1, progress) => {
      item.progress = progress

      this.dispatchEvent(evt('progress', { detail: { item }  }))
    }

    const buffer = await xhr(`${this.config.getBasePath()}/${name}`, {
      method: 'GET',
      isBinary: true,
      progressCallback
    }).catch((err: any) => {
      item.error()
      console.error(err, item)
      this.checkStatus()
    })

    if (item.isError()) {
      return
    }

    const sprite = Sprite.parse(buffer)
    item.done(sprite)

    this.dispatchEvent(evt('load', { detail: { item }  }))
    this.checkStatus()
  }

  async loadSky(name: string) {
    const item = new LoadItemSky(name)
    this.skies.push(item)
    this.dispatchEvent(evt('loadstart', { detail: { item }  }))

    const progressCallback: ProgressCallback = (_1, progress) => {
      item.progress = progress
      this.dispatchEvent(evt('progress', { detail: { item }  }))
    }

    const skiesPath = this.config.getSkiesPath()
    const buffer = await xhr(`${skiesPath}/${name}.tga`, {
      method: 'GET',
      isBinary: true,
      progressCallback
    }).catch((err: any) => {
      item.error()
      console.error(err, item)
      this.checkStatus()
    })

    if (item.isError()) {
      return
    }

    const skyImage = Tga.parse(buffer, name)
    item.done(skyImage)

    this.dispatchEvent(evt('load', { detail: { item }  }))
    this.checkStatus()
  }

  async loadWad(name: string) {
    const wadItem = new LoadItemWad(name)
    this.wads.push(wadItem)
    this.dispatchEvent(evt('loadstart', { detail: { item: wadItem }  }))

    const progressCallback: ProgressCallback = (_1, progress) => {
      wadItem.progress = progress
      this.dispatchEvent(evt('progress', { detail: { item: wadItem }  }))
    }

    const wadsPath = this.config.getWadsPath()
    const buffer = await xhr(`${wadsPath}/${name}`, {
      method: 'GET',
      isBinary: true,
      progressCallback
    }).catch((err: any) => {
      wadItem.error()
      console.error(err, wadItem)
      this.checkStatus()
    })

    if (wadItem.isError()) {
      return
    }

    const wad = await Wad.parse(buffer)
    wadItem.done(wad)

    if (!this.map || !this.map.data) {
      return
    }

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

    this.dispatchEvent(evt('loadstart', { detail: { item: wadItem }  }))
    this.checkStatus()
  }

  async loadSound(name: string, index: number) {
    const sound = new LoadItemSound(name)
    this.sounds.push(sound)

    this.dispatchEvent(evt('loadstart', { detail: { item: sound }  }))

    const progressCallback: ProgressCallback = (_1, progress) => {
      sound.progress = progress

      this.dispatchEvent(evt('loadstart', { detail: { item: sound }  }))
    }

    const soundsPath = this.config.getSoundsPath()
    const buffer = await xhr(`${soundsPath}/${name}`, {
      method: 'GET',
      isBinary: true,
      progressCallback
    }).catch((err: any) => {
      sound.error()
      console.error(err, sound)
      this.checkStatus()
    })

    if (sound.isError()) {
      return
    }

    const data = await Sound.create(buffer).catch((err: any) => {
      sound.error()
      console.error(err, sound)
      this.checkStatus()
    })

    if (!data || sound.isError()) {
      return
    }

    data.index = index
    data.name = name
    sound.done(data)

    this.dispatchEvent(evt('loadstart', { detail: { item: sound }  }))
    this.checkStatus()
  }
}
