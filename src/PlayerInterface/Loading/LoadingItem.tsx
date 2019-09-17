import { h } from 'preact'
import { LoadingStyle as s } from './style'

const itemTypeGroupName: { [name: string]: string } = {
  replay: 'Replay',
  bsp: 'Map',
  sound: 'Sounds',
  sky: 'Skybox',
  sprite: 'Sprites',
  wad: 'Wads'
}

export function LoadingItem(props: { name: string; progress: number }) {
  const name = itemTypeGroupName[props.name]
  const status = Math.round(props.progress * 100) + '%'

  let length = 29 - name.length - status.length
  if (length < 2) {
    length = 9 - status.length
  }

  const dots = Array(length).join('.')

  const fmt = `${name}${dots}${status}`

  return <li class={s.logItem}>{fmt}</li>
}
