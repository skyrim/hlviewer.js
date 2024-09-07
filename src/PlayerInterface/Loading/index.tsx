import type { Unsubscribe } from 'nanoevents'
import { createSignal, For, onCleanup, onMount } from 'solid-js'
import type { Game } from '../../Game'
import type { LoadItem } from '../../Loader'
import { LoadingStyle as s } from './style'

const itemTypeGroupName: { [name: string]: string } = {
  replay: 'Replay',
  bsp: 'Map',
  sound: 'Sounds',
  sky: 'Skybox',
  sprite: 'Sprites',
  wad: 'Wads'
}

export function Loading(props: { game: Game; visible: boolean }) {
  let offLoadStart: Unsubscribe | undefined = undefined
  let offProgress: Unsubscribe | undefined = undefined

  const [items, setItems] = createSignal<{ [name: string]: { name: string; progress: number }[] }>({})

  onMount(() => {
    const loaderEvents = props.game.loader.events
    offLoadStart = loaderEvents.on('loadstart', onItemLoad)
    offProgress = loaderEvents.on('progress', onItemProgress)
  })

  onCleanup(() => {
    offLoadStart?.()
    offProgress?.()
  })

  const onItemLoad = (item: LoadItem) => {
    const typeItems = items()[item.type] ? items()[item.type] : []

    for (let i = 0; i < typeItems.length; ++i) {
      if (typeItems[i] === item) {
        return
      }
    }

    typeItems.push({
      name: item.name,
      progress: 0
    })

    setItems({ ...items(), [item.type]: typeItems })
  }

  const onItemProgress = (item: LoadItem) => {
    if (!items()[item.type]) {
      return
    }

    const typeItems = items()[item.type]

    for (let i = 0; i < typeItems.length; ++i) {
      if (typeItems[i].name === item.name) {
        typeItems[i].progress = item.progress
        break
      }
    }
  }

  const formatItem = (_name: string, progress: number) => {
    let name = _name
    name = itemTypeGroupName[name]
    const status = `${Math.round(progress * 100)}%`

    let length = 29 - name.length - status.length
    if (length < 2) {
      length = 9 - status.length
    }

    const dots = Array(length).join('.')

    return `${name}${dots}${status}`
  }

  return (
    <div class={props.visible ? s.loading : s.loadingHidden}>
      <div class={s.spinner}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="80px" height="80px" viewBox="0 0 80 80">
          <title>Loading</title>
          <path
            fill="#ffffff"
            d="M40,72C22.4,72,8,57.6,8,40C8,22.4,22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2s-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6,28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z"
          />
        </svg>
      </div>

      <ul class={s.log}>
        <For each={Object.entries(items())}>
          {([name, items]) => (
            <li class={s.logItem}>
              {formatItem(name, items.reduce((prev, cur) => prev + cur.progress, 0) / items.length)}
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}
