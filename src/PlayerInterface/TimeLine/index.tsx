import { createSignal, onCleanup, onMount } from 'solid-js'
import type { Unsubscribe } from 'nanoevents'
import type { Game } from '../../Game'
import { TimeLine as s } from './style'

export function TimeLine(props: { game: Game }) {
  let offPostUpdate: Unsubscribe | undefined = undefined

  const [progress, setProgress] = createSignal(0)
  const [ghostKnobActive, setGhostKnobActive] = createSignal(false)
  const [ghostKnobPos, setGhostKnobPos] = createSignal('0%')
  // const [onPostUpdate, setOnPostUpdate] = createSignal(null)

  onMount(() => {
    offPostUpdate = props.game.events.on('postupdate', () => {
      setProgress(props.game.player.currentTime / props.game.player.replay.length)
    })
  })

  onCleanup(() => {
    offPostUpdate?.()
  })

  const onClick = (e: MouseEvent & { currentTarget: HTMLButtonElement }) => {
    const rects = e.currentTarget.getClientRects()[0]
    const progress = 1 - (rects.right - e.pageX) / (rects.right - rects.left)
    props.game.player.seekByPercent(progress * 100)
    props.game.player.pause()
  }

  const onMouseEnter = () => {
    setGhostKnobActive(true)
  }

  const onMouseMove = (e: MouseEvent & { currentTarget: HTMLButtonElement }) => {
    if (!ghostKnobActive()) {
      return
    }

    const rects = e.currentTarget.getClientRects()[0]
    const progressPos = 1 - (rects.right - e.pageX) / (rects.right - rects.left)
    setGhostKnobPos(`${progressPos * 100}%`)
  }

  const onMouseLeave = () => {
    setGhostKnobActive(false)
  }

  const knobOffset = () => {
    const timePos = progress() * 100
    return `${timePos}%`
  }

  const lineOffset = () => {
    const timePos = progress() * 100
    return `${100 - timePos}%`
  }

  return (
    <button
      type="button"
      class={s.timeline}
      onClick={(e) => onClick(e)}
      onMouseEnter={() => onMouseEnter()}
      onMouseMove={(e) => onMouseMove(e)}
      onMouseLeave={() => onMouseLeave()}
    >
      <div class={s.ghostLine} />
      <div class={s.line} style={{ right: lineOffset() }} />
      <div class={s.knob} style={{ left: knobOffset() }} />
      <div class={s.ghostKnob} style={{ left: ghostKnobPos() }} />
    </button>
  )
}
