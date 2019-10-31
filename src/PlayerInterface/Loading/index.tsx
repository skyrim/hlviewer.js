import { h } from 'preact'
import { classes } from 'typestyle'
import { useEffect } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from './Spinner'
import { AppState } from '../State'
import { LoadingItem } from './LoadingItem'
import { LoadingStyle as s } from './style'
import { Loader, LoadListenerType } from '../../Resource/Loader'
import {
  loadingAdd,
  loadingClear,
  loadingProgress
} from '../State/Loading/actions'

export function Loading(props: { loader: Loader; class?: string }) {
  const dispatch = useDispatch()
  const itemGroups = useSelector((state: AppState) => state.loading.groups)
  useEffect(() => {
    const loadStartListener = (type: string, name: string) => {
      dispatch(loadingAdd({ type, name }))
    }

    const loadProgressListener = (
      type: string,
      name: string,
      progress: number
    ) => {
      dispatch(loadingProgress({ type, name }, progress))
    }

    props.loader.addListener({
      type: LoadListenerType.start,
      listener: loadStartListener
    })

    props.loader.addListener({
      type: LoadListenerType.progress,
      listener: loadProgressListener
    })

    return () => {
      dispatch(loadingClear())

      props.loader.removeListener({
        type: LoadListenerType.start,
        listener: loadStartListener
      })
      props.loader.removeListener({
        type: LoadListenerType.progress,
        listener: loadProgressListener
      })
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
