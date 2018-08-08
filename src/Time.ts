const wnd: any = window

let _now
if (typeof performance !== 'undefined') {
  if (performance.now) {
    _now = () => wnd.performance.now()
  } else if (wnd.performance.mozNow) {
    _now = () => wnd.performance.mozNow()
  } else if (wnd.performance.msNow) {
    _now = () => wnd.performance.msNow()
  } else if (wnd.performance.oNow) {
    _now = () => wnd.performance.oNow()
  } else if (wnd.performance.webkitNow) {
    _now = () => wnd.performance.webkitNow()
  } else if (Date.now) {
    _now = () => Date.now()
  }
}

export const now = _now || (() => new Date().getTime())

export const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds - m * 60)
  const mm = m < 10 ? '0' + m : m.toString()
  const ss = s < 10 ? '0' + s : s.toString()
  return mm + ':' + ss
}
