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

export const Fullscreen = {
  element() {
    return doc[apis[apiIdx].element]
  },
  enabled() {
    return doc[apis[apiIdx].enabled]
  },
  isInFullscreen() {
    return Fullscreen.element() !== null
  },
  enter(node: any) {
    node[apis[apiIdx].request]()
  },
  exit() {
    doc[apis[apiIdx].exit]()
  },
  onChange(callback: () => void) {
    return window.addEventListener(apis[apiIdx].change, callback)
  },
  onChangeRemove(callback: () => void) {
    window.removeEventListener(apis[apiIdx].change, callback)
  },
  onError(callback: () => void) {
    return window.addEventListener(apis[apiIdx].error, callback)
  }
}
