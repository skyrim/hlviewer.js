export class Config {
  public static init(params: any): Config {
    if (typeof params === 'string') {
      return new Config({
        autoplayOnLoad: false,
        paths: {
          base: params,
          replays: `${params}/replays`,
          maps: `${params}/maps`,
          wads: `${params}/wads`,
          skies: `${params}/skies`,
          sounds: `${params}/sounds`
        }
      })
    } else {
      return new Config({
        autoplayOnLoad: !!params.autoplayOnLoad,
        paths: {
          base: (params && params.paths && params.paths.base) || '',
          replays:
            (params && params.paths && params.paths.replays) || '/replays',
          maps: (params && params.paths && params.paths.maps) || '/maps',
          wads: (params && params.paths && params.paths.wads) || '/wads',
          skies: (params && params.paths && params.paths.skies) || '/skies',
          sounds: (params && params.paths && params.paths.sounds) || '/sounds'
        }
      })
    }
  }

  private autoplayOnLoad: boolean
  private paths: {
    base: string
    replays: string
    maps: string
    wads: string
    skies: string
    sounds: string
  }

  constructor(params: {
    autoplayOnLoad: boolean
    paths: {
      base: string
      replays: string
      maps: string
      wads: string
      skies: string
      sounds: string
    }
  }) {
    this.autoplayOnLoad = params.autoplayOnLoad
    this.paths = { ...params.paths }
  }

  shouldAutoplayOnLoad() {
    return this.autoplayOnLoad
  }

  getBasePath() {
    return this.paths.base
  }
  getReplaysPath() {
    return this.paths.replays
  }
  getMapsPath() {
    return this.paths.maps
  }
  getWadsPath() {
    return this.paths.wads
  }
  getSkiesPath() {
    return this.paths.skies
  }
  getSoundsPath() {
    return this.paths.sounds
  }
}
