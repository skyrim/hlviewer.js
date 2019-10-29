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
  loadingClear,
  loadingProgress
} from '../State/Loading/actions'

export function Loading(props: { game: Game; visible: boolean }) {
  const dispatch = useDispatch()
  const itemGroups = useSelector((state: AppState) => state.loading.groups)
  useEffect(() => {
    props.game.loader.addLoadStartListener(resource => {
      dispatch(loadingAdd(resource))
    })

    props.game.loader.addProgressListener((resource, progress) => {
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
        {Object.entries(itemGroups).map(([name, items]) => (
          <LoadingItem
            key={name}
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
