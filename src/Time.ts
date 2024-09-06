export const now = performance.now.bind(performance)

export const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds - m * 60)
  const mm = m < 10 ? `0${m}` : m.toString()
  const ss = s < 10 ? `0${s}` : s.toString()
  return `${mm}:${ss}`
}
