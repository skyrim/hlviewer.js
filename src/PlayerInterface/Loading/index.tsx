import { h, Component } from 'preact'
import { Game } from '../../Game'
import { LoadItem } from '../../Loader'
import { LoadingStyle as s } from './style'

interface LoadingProps {
  game: Game
  visible: boolean
}

interface LoadingState {
  items: {
    [name: string]: {
      name: string
      progress: number
    }[]
  }
}

const itemTypeGroupName: { [name: string]: string } = {
  replay: 'Replay',
  bsp: 'Map',
  sound: 'Sounds',
  sky: 'Skybox',
  sprite: 'Sprites',
  wad: 'Wads'
}

export class Loading extends Component<LoadingProps, LoadingState> {
  state: LoadingState = {
    items: {}
  }

  componentDidMount() {
    const loader = this.props.game.loader
    // loader.addLoadStartListener(this.onItemLoad)
    loader.addEventListener('loadstart', (event: any) => {
      this.onItemLoad(event.detail.item)
    })
    // loader.addProgressListener(this.onItemProgress)
    loader.addEventListener('progress', (event: any) => {
      this.onItemProgress(event.detail.item)
    })
  }

  componentWillUnmount() {
    const loader = this.props.game.loader
    // loader.removeLoadStartListener(this.onItemLoad)
    loader.removeEventListener('loadstart', this.onItemLoad as any)
    // loader.removeProgressListener(this.onItemProgress)
    loader.removeEventListener('progress', this.onItemProgress)
  }

  onItemLoad = (item: LoadItem) => {
    const items = this.state.items[item.type] ? this.state.items[item.type] : []

    for (let i = 0; i < items.length; ++i) {
      if (items[i] === item) {
        return
      }
    }

    items.push({
      name: item.name,
      progress: 0
    })

    this.setState({
      items: {
        ...this.state.items,
        [item.type]: items
      }
    })
  }

  onItemProgress = (item: any) => {
    if (!this.state.items[item.type]) {
      return
    }

    const items = this.state.items[item.type]

    for (let i = 0; i < items.length; ++i) {
      if (items[i].name === item.name) {
        items[i].progress = item.progress
        break
      }
    }

    this.forceUpdate()
  }

  formatItem(name: string, progress: number) {
    name = itemTypeGroupName[name]
    const status = Math.round(progress * 100) + '%'

    let length = 29 - name.length - status.length
    if (length < 2) {
      length = 9 - status.length
    }

    const dots = Array(length).join('.')

    return `${name}${dots}${status}`
  }

  render() {
    return (
      <div class={this.props.visible ? s.loading : s.loadingHidden}>
        <div class={s.spinner}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="80px"
            height="80px"
            viewBox="0 0 80 80"
            xmlSpace="preserve"
          >
            <path
              fill="#ffffff"
              width="10px"
              d="M40,72C22.4,72,8,57.6,8,40C8,22.4,22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2s-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6,28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z"
            />
          </svg>
        </div>

        <ul class={s.log}>
          {Object.entries(this.state.items).map(([name, items]) => (
            <li key={name} class={s.logItem}>
              {this.formatItem(
                name,
                items.reduce((prev, cur) => prev + cur.progress, 0) /
                  items.length
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
