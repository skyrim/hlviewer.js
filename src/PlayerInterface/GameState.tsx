import { createContext, useContext } from 'solid-js'
import { PlayerMode } from '../Game'

export const GameStateContext = createContext({
  mode: PlayerMode.FREE,
  time: 0,
  volume: 1,
  isPlaying: false,
  isPaused: false
})

export function useGameState() {
  return useContext(GameStateContext)
}
