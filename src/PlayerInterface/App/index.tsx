import { createSignal, onCleanup, onMount, Show } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Loading } from '../Loading'
import { FreeMode } from '../FreeMode'
import { ReplayMode } from '../ReplayMode'
import { Fullscreen } from '../../Fullscreen'
import { GameStateContext } from '../GameState'
import { type Game, PlayerMode } from '../../Game'
import './style.css'

export function App(props: { game: Game; root: Element }) {
  let screen: HTMLButtonElement | null = null
  let fadeOut: ReturnType<typeof setTimeout> | undefined = undefined

  const [title, setTitle] = createSignal(props.game.title)
  const [isActive, setIsActive] = createSignal(false)
  const [isLoading, setIsLoading] = createSignal(false)
  const [isMouseOver, setIsMouseOver] = createSignal(false)
  const [isVisible, setIsVisible] = createSignal(false)

  const [gameState, setGameState] = createStore({
    mode: props.game.mode,
    time: props.game.player.currentTime,
    volume: props.game.soundSystem.getVolume(),
    isPlaying: props.game.player.isPlaying,
    isPaused: props.game.player.isPaused
  })

  onMount(() => {
    if (!screen) {
      return
    }

    const game = props.game
    const root = props.root

    screen.appendChild(game.getCanvas())

    const offLoadStart = game.events.on('loadstart', () => setIsLoading(true))
    const offLoad = game.events.on('load', () => setIsLoading(false))
    const offModeChange = game.events.on('modechange', (mode: PlayerMode) => setGameState({ mode }))
    const offTitleChange = game.events.on('titlechange', (title: string) => setTitle(title))
    const offPlay = props.game.player.events.on('play', () => setGameState({ isPlaying: true, isPaused: false }))
    const offPause = props.game.player.events.on('pause', () => setGameState({ isPlaying: true, isPaused: true }))
    const offStop = props.game.player.events.on('stop', () => setGameState({ isPlaying: false, isPaused: false }))
    const offVolumeChange = props.game.soundSystem.events.on('volumeChange', () => {
      setGameState({ volume: props.game.soundSystem.getVolume() })
    })

    let interval: number
    const onPlay = () => {
      interval = setInterval(() => {
        setGameState({ time: props.game.player.currentTime })
      }, 100)
    }
    const onPauseOrStop = () => {
      clearInterval(interval)
    }
    const offPlayTimer = props.game.player.events.on('play', onPlay)
    const offPauseTimer = props.game.player.events.on('pause', onPauseOrStop)
    const offStopTimer = props.game.player.events.on('stop', onPauseOrStop)
    const offSeekTimer = props.game.player.events.on('seek', (time) => setGameState({ time }))

    window.addEventListener('click', onWindowClick)
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerlockchange', onPointerLockChange, false)

    root.addEventListener('click', onRootClick)
    root.addEventListener('mouseover', onMouseEnter)
    root.addEventListener('mousemove', onMouseMove)
    root.addEventListener('mouseout', onMouseLeave)
    root.addEventListener('contextmenu', onContextMenu)

    onCleanup(() => {
      offLoadStart?.()
      offLoad?.()
      offModeChange?.()
      offTitleChange?.()
      offPlay?.()
      offPause?.()
      offStop?.()
      offVolumeChange?.()
      offPlayTimer?.()
      offPauseTimer?.()
      offStopTimer?.()
      offSeekTimer?.()

      props.root.removeEventListener('click', onRootClick)
      window.removeEventListener('click', onWindowClick)
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerlockchange', onPointerLockChange, false)

      props.root.removeEventListener('mouseover', onMouseEnter)
      props.root.removeEventListener('mousemove', onMouseMove)
      props.root.removeEventListener('mouseout', onMouseLeave)
      props.root.removeEventListener('contextmenu', onContextMenu)
    })
  })

  const onPointerLockChange = () => {
    if (document.pointerLockElement === props.root) {
      props.game.pointerLocked = true
    } else {
      props.game.pointerLocked = false
    }
  }

  const onContextMenu = (e: Event) => {
    e.preventDefault()
  }

  const onWindowClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.hlv-app')) {
      setIsActive(false)
    }
  }

  const onRootClick = () => {
    setIsActive(true)
    fadeReset()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (!isActive()) {
      return
    }

    switch (e.code) {
      case 'KeyF': {
        if (Fullscreen.isInFullscreen()) {
          Fullscreen.exit()
        } else {
          Fullscreen.enter(props.root)
        }
        fadeReset()
        break
      }

      case 'KeyM': {
        props.game.soundSystem.toggleMute()
        fadeReset()
        break
      }

      case 'ArrowUp': {
        props.game.soundSystem.setVolume(props.game.soundSystem.getVolume() + 0.05)
        fadeReset()
        break
      }
      case 'ArrowDown': {
        props.game.soundSystem.setVolume(props.game.soundSystem.getVolume() - 0.05)
        fadeReset()
        break
      }

      case 'KeyJ':
      case 'ArrowLeft': {
        props.game.player.seek(props.game.player.currentTime - 5)
        fadeReset()
        break
      }
      case 'KeyL':
      case 'ArrowRight': {
        props.game.player.seek(props.game.player.currentTime + 5)
        fadeReset()
        break
      }

      case 'KeyK':
      case 'Space': {
        if (gameState.mode !== PlayerMode.REPLAY) {
          return
        }

        if (!props.game.player.isPlaying || props.game.player.isPaused) {
          props.game.player.play()
        } else {
          props.game.player.pause()
        }
        break
      }
    }
  }

  const onMouseEnter = () => {
    setIsMouseOver(true)
    fadeReset()
  }

  const onMouseMove = () => {
    if (isMouseOver() && !Fullscreen.isInFullscreen()) {
      fadeReset()
    }
  }

  const onMouseLeave = () => {
    setIsMouseOver(false)
    setIsVisible(false)

    clearTimeout(fadeOut)
    fadeOut = undefined
  }

  const fadeReset = () => {
    if (!isVisible()) {
      setIsVisible(true)
    }

    clearTimeout(fadeOut)
    fadeOut = setTimeout(() => {
      setIsVisible(false)
      fadeOut = undefined
    }, 2000)
  }

  const onScreenClick = () => {
    switch (gameState.mode) {
      case PlayerMode.REPLAY: {
        const player = props.game.player
        if (!player.isPlaying || player.isPaused) {
          player.play()
        } else {
          player.pause()
        }
        break
      }

      case PlayerMode.FREE: {
        props.root.requestPointerLock()
        break
      }
    }
  }

  const onScreenDblClick = () => {
    if (Fullscreen.isInFullscreen()) {
      Fullscreen.exit()
    } else {
      Fullscreen.enter(props.root)
    }
  }

  return (
    <GameStateContext.Provider value={gameState}>
      <div
        classList={{
          'hlv-app': true,
          visible: isVisible(),
          'mode-free': gameState.mode === PlayerMode.FREE,
          'mode-replay': gameState.mode === PlayerMode.REPLAY
        }}
      >
        <div class="hlv-title">{title()}</div>

        <Loading game={props.game} visible={isLoading()} />

        <button
          type="button"
          class="hlv-screen"
          ref={(node) => {
            screen = node
          }}
          onClick={() => onScreenClick()}
          onDblClick={() => onScreenDblClick()}
        />

        <Show when={gameState.mode === PlayerMode.FREE}>
          <FreeMode class="hlv-controls" game={props.game} root={props.root} />
        </Show>

        <Show when={gameState.mode === PlayerMode.REPLAY}>
          <ReplayMode class="hlv-controls" game={props.game} root={props.root} visible={isMouseOver()} />
        </Show>
      </div>
    </GameStateContext.Provider>
  )
}
