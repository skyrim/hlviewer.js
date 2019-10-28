import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { Game } from '../../Game'
import { Spinner } from './Spinner'
import { AppState } from '../State'
import { LoadingItem } from './LoadingItem'
import { LoadingStyle as s } from './style'
import {
  loadingAdd,
  loadingProgress,
  loadingClear
} from '../State/Loading/actions'

export function Loading(props: { game: Game; visible: boolean }) {
  const dispatch = useDispatch()
  const itemGroups = useSelector((state: AppState) => state.loading.groups)
  useEffect(() => {
    props.game.loader.addLoadStartListener(resource => {
      console.log(resource.name, resource.type)
      dispatch(loadingAdd(resource))
    })

    props.game.loader.addProgressListener((resource, progress) => {
      console.log(resource.name, resource.type, progress)
      dispatch(loadingProgress(resource, progress))
    })

    return () => {
      dispatch(loadingClear())
    }
  }, [])

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
                Object.values(items).reduce(
                  (prev, cur) => prev + cur.progress,
                  0
                ) / Object.values(items).length
              }
            />
          ))}
      </ul>
    </div>
  )
}
