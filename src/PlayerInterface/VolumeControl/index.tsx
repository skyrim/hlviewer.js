import { createSignal, onCleanup, onMount } from 'solid-js'
import type { Unsubscribe } from 'nanoevents'
import type { Game } from '../../Game'
import { VolumeControl as s } from './style'

export function VolumeControl(props: { game: Game }) {
  let offVolumeChange: Unsubscribe | undefined = undefined

  const [volume, setVolume] = createSignal(props.game.soundSystem.getVolume())
  const [ghostKnobActive, setGhostKnobActive] = createSignal(false)
  const [ghostKnobPos, setGhostKnobPos] = createSignal('5%')

  onMount(() => {
    offVolumeChange = props.game.soundSystem.events.on('volumeChange', onVolumeChange)
  })

  onCleanup(() => {
    offVolumeChange?.()
  })

  const onVolumeChange = () => {
    setVolume(props.game.soundSystem.getVolume())
  }

  const onClick = (e: MouseEvent & { currentTarget: HTMLButtonElement }) => {
    const rects = e.currentTarget.getClientRects()[0]
    const volume = 1 - (rects.right - e.pageX) / (rects.right - rects.left)
    props.game.soundSystem.setVolume(volume)
  }

  const onMouseEnter = () => {
    setGhostKnobActive(true)
  }

  const onMouseMove = (e: MouseEvent & { currentTarget: HTMLButtonElement }) => {
    if (!ghostKnobActive()) {
      return
    }

    const rects = e.currentTarget.getClientRects()[0]
    const volumePos = 1 - (rects.right - e.pageX) / (rects.right - rects.left)
    const pos = `${Math.min(95, Math.max(5, volumePos * 100))}%`
    setGhostKnobPos(pos)
  }

  const onMouseLeave = () => {
    setGhostKnobActive(false)
  }

  const volumePos = () => volume() * 100
  const knobOffset = () => `${Math.min(95, Math.max(5, volumePos()))}%`
  const lineOffset = () => `${Math.min(95, Math.max(5, 100 - volumePos()))}%`

  return (
    <button
      type="button"
      class={s.control}
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
