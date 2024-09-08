import { createSignal, onCleanup, onMount } from 'solid-js'
import { Fullscreen } from '../../../Fullscreen'
import './style.css'

export function FullscreenButton(props: { active: boolean; root: Element }) {
  const [isInFullscreen, setIsInFullscreen] = createSignal(Fullscreen.isInFullscreen())

  onMount(() => {
    Fullscreen.onChange(onFullscreen)
  })

  onCleanup(() => {
    Fullscreen.onChangeRemove(onFullscreen)
  })

  const onClick = () => {
    if (Fullscreen.isInFullscreen()) {
      Fullscreen.exit()
    } else {
      Fullscreen.enter(props.root)
    }
  }

  const onFullscreen = () => {
    setIsInFullscreen(Fullscreen.isInFullscreen())
  }

  return (
    <button type="button" class="hlv-button hlv-fullscreen-button" onClick={() => onClick()}>
      {isInFullscreen() ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-minimize"
        >
          <title>Exit fullscreen</title>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 19v-2a2 2 0 0 1 2 -2h2" />
          <path d="M15 5v2a2 2 0 0 0 2 2h2" />
          <path d="M5 15h2a2 2 0 0 1 2 2v2" />
          <path d="M5 9h2a2 2 0 0 0 2 -2v-2" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <title>Fullscreen</title>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
          <path d="M4 16v2a2 2 0 0 0 2 2h2" />
          <path d="M16 4h2a2 2 0 0 1 2 2v2" />
          <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
        </svg>
      )}
    </button>
  )
}
