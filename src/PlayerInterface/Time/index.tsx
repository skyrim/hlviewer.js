import { formatTime } from '../../Time'
import type { ReplayPlayer } from '../../ReplayPlayer'
import { useGameState } from '../GameState'
import './style.css'

export function Time(props: { player: ReplayPlayer }) {
  const gameState = useGameState()
  const current = () => formatTime(gameState.time)
  const total = () => formatTime(props.player.replay.length)

  return (
    <div class="hlv-time">
      {current()} / {total()}
    </div>
  )
}
