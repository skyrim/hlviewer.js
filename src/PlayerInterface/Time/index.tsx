import { createSignal, onCleanup, onMount } from 'solid-js'
import type { Unsubscribe } from 'nanoevents'
import { formatTime } from '../../Time'
import type { ReplayPlayer } from '../../ReplayPlayer'
import { Time as s } from './style'

export function Time(props: { player: ReplayPlayer }) {
  let offPlay: Unsubscribe | undefined = undefined
  let offPause: Unsubscribe | undefined = undefined
  let offStop: Unsubscribe | undefined = undefined

  const [isPlaying, setIsPlaying] = createSignal(false)

  onMount(() => {
    offPlay = props.player.events.on('play', onPlay)
    offPause = props.player.events.on('pause', onPauseOrStop)
    offStop = props.player.events.on('stop', onPauseOrStop)
  })

  onCleanup(() => {
    offPlay?.()
    offPause?.()
    offStop?.()
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
    <div class={s.time}>
      {current()} / {total()}
    </div>
  )
}
