import type { Game } from '../../Game'
import { useGameState } from '../GameState'
import './style.css'

export function VolumeControl(props: { game: Game }) {
  const gameState = useGameState()

  const onMouseDown = (e: MouseEvent & { currentTarget: HTMLDivElement }) => {
    const rects = e.currentTarget.getClientRects()[0]
    const volume = 1 - (rects.right - e.pageX) / (rects.right - rects.left)
    props.game.soundSystem.setVolume(volume)

    const onMouseMove = (e: MouseEvent) => {
      const volume = Math.max(0, Math.min(1 - (rects.right - e.pageX) / (rects.right - rects.left), 1))
      props.game.soundSystem.setVolume(volume)
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

  const volumePos = () => gameState.volume * 100
  const knobOffset = () => `${Math.min(95, Math.max(5, volumePos()))}%`
  const lineOffset = () => `${Math.min(95, Math.max(5, 100 - volumePos()))}%`

  return (
    <div class="hlv-volume" onMouseDown={(e) => onMouseDown(e)}>
      <div class="hlv-volume-ghostline" />
      <div class="hlv-volume-line" style={{ right: lineOffset() }} />
      <div class="hlv-volume-knob" style={{ left: knobOffset() }} />
    </div>
  )
}
