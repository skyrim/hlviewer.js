import { h } from 'preact'
import { classes } from 'typestyle'
import { useEffect } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from './Spinner'
import { AppState } from '../State'
import { LoadingItem } from './LoadingItem'
import { LoadingStyle as s } from './style'
import { ResourceType } from '../../Resource/ResourceType'
import { Loader, LoadListenerType } from '../../Resource/Loader'
import {
  loadingAdd,
  loadingClear,
  loadingProgress
} from '../State/Loading/actions'

const typeTable = {
  [`${ResourceType.replay}`]: 'replay',
  [`${ResourceType.map}`]: 'map',
  [`${ResourceType.texture}`]: 'texture',
  [`${ResourceType.font}`]: 'font',
  [`${ResourceType.sound}`]: 'sound',
  [`${ResourceType.sprite}`]: 'sprite',
  [`${ResourceType.model}`]: 'model'
}

export function Loading(props: { loader: Loader; class?: string }) {
  const dispatch = useDispatch()
  const itemGroups = useSelector((state: AppState) => state.loading.groups)
  useEffect(() => {
    const loadStartListener = (type: ResourceType, name: string) => {
      dispatch(loadingAdd({ type: typeTable[`${type}`], name }))
    }

    const loadProgressListener = (
      type: ResourceType,
      name: string,
      progress: number
    ) => {
      dispatch(loadingProgress({ type: typeTable[`${type}`], name }, progress))
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
