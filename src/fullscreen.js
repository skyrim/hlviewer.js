var apis = [{
    enabled: 'fullscreenEnabled',
    element: 'fullscreenElement',
    request: 'requestFullscreen',
    exit:    'exitFullscreen',
    change:  'fullscreenchange',
    error:   'fullscreenerror'
}, {
    enabled: 'mozFullScreenEnabled',
    element: 'mozFullScreenElement',
    request: 'mozRequestFullScreen',
    exit:    'mozCancelFullScreen',
    change:  'mozfullscreenchange',
    error:   'mozfullscreenerror'
}, {
    enabled: 'webkitFullscreenEnabled',
    element: 'webkitCurrentFullScreenElement',
    request: 'webkitRequestFullscreen',
    exit:    'webkitExitFullscreen',
    change:  'webkitfullscreenchange',
    error:   'webkitfullscreenerror'
}, {
    enabled: 'msFullscreenEnabled',
    element: 'msFullscreenElement',
    request: 'msRequestFullscreen',
    exit:    'msExitFullscreen',
    change:  'MSFullscreenChange',
    error:   'MSFullscreenError'
}]

var apiIdx = 0

for (let i = 0; i < apis.length; ++i) {
    if (typeof document[apis[i].enabled] !== 'undefined') {
        apiIdx = i
        break
    }
}

export default class Fullscreen {
    static element() {
        return document[apis[apiIdx].element]
    }

    static enabled() {
        return document[apis[apiIdx].enabled]
    }

    static isInFullscreen() {
        return Fullscreen.element() !== null
    }

    static enter(node) {
        node[apis[apiIdx].request]()
    }

    static exit() {
        document[apis[apiIdx].exit]()
    }

    static onChange(callback) {
        return window.addEventListener(apis[apiIdx].change, callback)
    }

    static onError(callback) {
        return window.addEventListener(apis[apiIdx].error, callback)
    }
}