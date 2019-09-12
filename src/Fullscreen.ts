const apis = [
  {
    enabled: 'fullscreenEnabled',
    element: 'fullscreenElement',
    request: 'requestFullscreen',
    exit: 'exitFullscreen',
    change: 'fullscreenchange',
    error: 'fullscreenerror'
  },
  {
    enabled: 'mozFullScreenEnabled',
    element: 'mozFullScreenElement',
    request: 'mozRequestFullScreen',
    exit: 'mozCancelFullScreen',
    change: 'mozfullscreenchange',
    error: 'mozfullscreenerror'
  },
  {
    enabled: 'webkitFullscreenEnabled',
    element: 'webkitCurrentFullScreenElement',
    request: 'webkitRequestFullscreen',
    exit: 'webkitExitFullscreen',
    change: 'webkitfullscreenchange',
    error: 'webkitfullscreenerror'
  },
  {
    enabled: 'msFullscreenEnabled',
    element: 'msFullscreenElement',
    request: 'msRequestFullscreen',
    exit: 'msExitFullscreen',
    change: 'MSFullscreenChange',
    error: 'MSFullscreenError'
  }
]

let apiIdx = 0

interface Doc {
  [key: string]: any
}
const doc: Doc = document

for (let i = 0; i < apis.length; ++i) {
  if (typeof doc[apis[i].enabled] !== 'undefined') {
    apiIdx = i
    break
  }
}

export class Fullscreen {
  static element() {
    return doc[apis[apiIdx].element]
  }

  static enabled() {
    return doc[apis[apiIdx].enabled]
  }

  static isInFullscreen() {
    return Fullscreen.element() !== null
  }

  static enter(node: any) {
    node[apis[apiIdx].request]()
  }

  static exit() {
    doc[apis[apiIdx].exit]()
  }

  static onChange(callback: () => void) {
    return window.addEventListener(apis[apiIdx].change, callback)
  }

  static onChangeRemove(callback: () => void) {
    window.removeEventListener(apis[apiIdx].change, callback)
  }

  static onError(callback: () => void) {
    return window.addEventListener(apis[apiIdx].error, callback)
  }
}
