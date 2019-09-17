import { useEffect } from 'preact/hooks'
import { Loader } from '../../Loader'

type Item = {
  name: string
  progress: number
}

type ItemGroups = { [name: string]: Item[] }

type ItemGroupSetter = (ig: ItemGroups) => void

export function useLoader(loader: Loader, setItemGroups: ItemGroupSetter) {
  useEffect(() => {
    const onChange = () => {
      const groups: ItemGroups = {}

      if (loader.replay) {
        groups.replay = [
          {
            name: loader.replay.name,
            progress: loader.replay.progress
          }
        ]
      }

      if (loader.map) {
        groups.bsp = [
          {
            name: loader.map.name,
            progress: loader.map.progress
          }
        ]
      }

      groups.wad = loader.wads.map(a => ({
        name: a.name,
        progress: a.progress
      }))

      groups.sky = loader.skies.map(a => ({
        name: a.name,
        progress: a.progress
      }))

      groups.sprite = Object.entries(loader.sprites).map(([name, sprite]) => ({
        name: name,
        progress: sprite.progress
      }))

      groups.sound = loader.sounds.map(a => ({
        name: a.name,
        progress: a.progress
      }))

      setItemGroups(groups)
    }

    loader.addLoadStartListener(onChange)
    loader.addProgressListener(onChange)

    return () => {
      loader.removeLoadStartListener(onChange)
      loader.removeProgressListener(onChange)
    }
  }, [])
}
