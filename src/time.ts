let wnd: any = window

let now
if (typeof performance !== 'undefined') {
    if (performance.now) {
        now = () => wnd.performance.now()
    } else if (wnd.performance.mozNow) {
        now = () => wnd.performance.mozNow()
    } else if (wnd.performance.msNow) {
        now = () => wnd.performance.msNow()
    } else if (wnd.performance.oNow) {
        now = () => wnd.performance.oNow()
    } else if (wnd.performance.webkitNow) {
        now = () => wnd.performance.webkitNow()
    } else if (Date.now) {
        now = () => Date.now()
    }
} else {
    now = () => new Date().getTime()
}

const formatTime = (seconds: number) => {
    let m = Math.floor(seconds / 60)
    let mStr = m.toString()
    if (m < 10) {
        mStr = '0' + m
    }

    let s = Math.floor(seconds - m * 60)
    let sStr = s.toString()
    if (s < 10) {
        sStr = '0' + s
    }

    return `${mStr}:${sStr}`
}

export {
    now,
    formatTime
}
