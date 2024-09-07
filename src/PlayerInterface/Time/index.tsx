import { createSignal, onCleanup, onMount } from 'solid-js'
import { formatTime } from '../../Time'
import type { ReplayPlayer } from '../../ReplayPlayer'
import './style.css'

export function Time(props: { player: ReplayPlayer }) {
  const [isPlaying, setIsPlaying] = createSignal(false)

  onMount(() => {
    const offPlay = props.player.events.on('play', onPlay)
    const offPause = props.player.events.on('pause', onPauseOrStop)
    const offStop = props.player.events.on('stop', onPauseOrStop)
    onCleanup(() => {
      offPlay?.()
      offPause?.()
      offStop?.()
    })
  })

  const onPlay = () => {
    setIsPlaying(true)
  }

  const onPauseOrStop = () => {
    setIsPlaying(false)
  }

  const update = () => {
    if (!isPlaying()) {
      return
    }

    // this.forceUpdate()
    setTimeout(update, 100)
  }

  const current = () => formatTime(props.player.currentTime)
  const total = () => formatTime(props.player.replay.length)

  return (
    <div class="hlv-time">
      {current()} / {total()}
    </div>
  )
}
