import { useGameState } from '../../GameState'
import { VolumeFull } from './VolumeFull'
import { VolumeHalf } from './VolumeHalf'
import { VolumeMute } from './VolumeMute'

export function VolumeButton(props: { onClick(): void }) {
  const gameState = useGameState()

  return (
    <button type="button" class="hlv-button" onClick={() => props.onClick()}>
      {gameState.volume === 0 ? <VolumeMute /> : gameState.volume > 0.5 ? <VolumeFull /> : <VolumeHalf />}
    </button>
  )
}
