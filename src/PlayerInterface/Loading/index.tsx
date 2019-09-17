import { h } from 'preact'
import { useState } from 'preact/hooks'
import { Game } from '../../Game'
import { Spinner } from './Spinner'
import { useLoader } from './useLoader'
import { LoadingItem } from './LoadingItem'
import { LoadingStyle as s } from './style'

type Item = {
  name: string
  progress: number
}

type ItemGroups = { [name: string]: Item[] }

export function Loading(props: { game: Game; visible: boolean }) {
  const [itemGroups, setItemGroups] = useState({} as ItemGroups)
  useLoader(props.game.loader, setItemGroups)

  return (
    <div class={props.visible ? s.loading : s.loadingHidden}>
      <Spinner />

      <ul class={s.log}>
        {Object.entries(itemGroups)
          .filter(([_, items]) => items.length)
          .map(([name, items]) => (
            <LoadingItem
              name={name}
              progress={
                items.reduce((prev, cur) => prev + cur.progress, 0) /
                items.length
              }
            />
          ))}
      </ul>
    </div>
  )
}
