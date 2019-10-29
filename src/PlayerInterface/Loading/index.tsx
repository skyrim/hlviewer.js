import { h } from 'preact'
import { classes } from 'typestyle'
import { useEffect } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from './Spinner'
import { AppState } from '../State'
import { Loader } from '../../Loader'
import { LoadingItem } from './LoadingItem'
import { LoadingStyle as s } from './style'
import {
  loadingAdd,
  loadingClear,
  loadingProgress
} from '../State/Loading/actions'

export function Loading(props: { loader: Loader; class?: string }) {
  const dispatch = useDispatch()
  const itemGroups = useSelector((state: AppState) => state.loading.groups)
  useEffect(() => {
    props.loader.addLoadStartListener(resource => {
      dispatch(loadingAdd(resource))
    })

    props.loader.addProgressListener((resource, progress) => {
      dispatch(loadingProgress(resource, progress))
    })

    return () => {
      dispatch(loadingClear())
    }
  }, [])

  return (
    <div class={classes(props.class, s.loading)}>
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
