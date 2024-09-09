import { createSignal, onCleanup, onMount } from 'solid-js'
import type { Game } from '../../Game'
import { formatTime } from '../../Time'
import './style.css'

export function Timeline(props: { game: Game }) {
  const [progress, setProgress] = createSignal(0)
  const [ghostKnobActive, setGhostKnobActive] = createSignal(false)
  const [ghostKnobPos, setGhostKnobPos] = createSignal('0%')
  const [ghostTime, setGhostTime] = createSignal(0)

  onMount(() => {
    const offPostUpdate = props.game.events.on('postupdate', () => {
      setProgress(props.game.player.currentTime / props.game.player.replay.length)
    })
    onCleanup(() => {
      offPostUpdate?.()
    })
  })

  const onMouseDown = (e: MouseEvent & { currentTarget: HTMLButtonElement }) => {
    const rects = e.currentTarget.getClientRects()[0]
    const progress = 1 - (rects.right - e.pageX) / (rects.right - rects.left)
    props.game.player.seekByPercent(progress * 100)
    props.game.player.pause()

    const onMouseMove = (e: MouseEvent) => {
      const progressPos = Math.max(0, Math.min(1 - (rects.right - e.pageX) / (rects.right - rects.left), 1))
      props.game.player.seekByPercent(progressPos * 100)
      props.game.player.pause()
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener(
      'mouseup',
      () => {
        window.removeEventListener('mousemove', onMouseMove)
      },
      { once: true }
    )
  }

  const onMouseMove = (e: MouseEvent & { currentTarget: HTMLButtonElement }) => {
    const rects = e.currentTarget.getClientRects()[0]
    const progressPos = Math.max(0, Math.min(1 - (rects.right - e.pageX) / (rects.right - rects.left), 1))
    if (ghostKnobActive()) {
      setGhostKnobPos(`${progressPos * 100}%`)
      setGhostTime(props.game.player.replay.length * progressPos)
    }
  }

  const onMouseEnter = () => {
    setGhostKnobActive(true)
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
      class="hlv-timeline"
      onMouseDown={(e) => onMouseDown(e)}
      onMouseMove={(e) => onMouseMove(e)}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
    >
      <div class="hlv-timeline-ghostline" />
      <div class="hlv-timeline-line" style={{ right: lineOffset() }} />
      <div class="hlv-timeline-knob" style={{ left: knobOffset() }} />
      <div class="hlv-timeline-ghosttime" style={{ left: ghostKnobPos() }}>
        {formatTime(ghostTime())}
      </div>
    </button>
  )
}
