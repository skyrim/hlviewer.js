import { createSignal, onCleanup, onMount } from 'solid-js'
import type { Game } from '../../Game'
import './style.css'

export function VolumeControl(props: { game: Game }) {
  const [volume, setVolume] = createSignal(props.game.soundSystem.getVolume())
  const [ghostKnobActive, setGhostKnobActive] = createSignal(false)
  const [ghostKnobPos, setGhostKnobPos] = createSignal('5%')

  onMount(() => {
    const offVolumeChange = props.game.soundSystem.events.on('volumeChange', onVolumeChange)
    onCleanup(() => {
      offVolumeChange?.()
    })
  })

  const onVolumeChange = () => {
    setVolume(props.game.soundSystem.getVolume())
  }

  let isMouseDown = false
  const onMouseDown = (e: MouseEvent & { currentTarget: HTMLButtonElement }) => {
    isMouseDown = true
    const rects = e.currentTarget.getClientRects()[0]
    const volume = 1 - (rects.right - e.pageX) / (rects.right - rects.left)
    props.game.soundSystem.setVolume(volume)

    window.addEventListener(
      'mouseup',
      () => {
        isMouseDown = false
      },
      { once: true }
    )
  }

  const onMouseEnter = () => {
    setGhostKnobActive(true)
  }

  const onMouseMove = (e: MouseEvent & { currentTarget: HTMLButtonElement }) => {
    const rects = e.currentTarget.getClientRects()[0]
    const volume = 1 - (rects.right - e.pageX) / (rects.right - rects.left)
    if (ghostKnobActive()) {
      setGhostKnobPos(`${Math.min(95, Math.max(5, volume * 100))}%`)
    }
    if (isMouseDown) {
      props.game.soundSystem.setVolume(volume)
    }
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
      class="hlv-volume"
      onMouseDown={(e) => onMouseDown(e)}
      onMouseMove={(e) => onMouseMove(e)}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
    >
      <div class="hlv-volume-ghostline" />
      <div class="hlv-volume-line" style={{ right: lineOffset() }} />
      <div class="hlv-volume-knob" style={{ left: knobOffset() }} />
      <div class="hlv-volume-ghostknob" style={{ left: ghostKnobPos() }} />
    </button>
  )
}
