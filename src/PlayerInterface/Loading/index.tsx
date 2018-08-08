import { h, Component } from 'preact'
import { Game } from '../../Game'
import './style.scss'

interface LoadingProps {
  game: Game
  visible: boolean
}

interface LoadingState {
  items: {
    name: string
    progress: number
  }[]
}

export class Loading extends Component<LoadingProps, LoadingState> {
  state: LoadingState = {
    items: []
  }

  componentDidMount() {
    const events = this.props.game.loader.events
    events.on('loadstart', this.onItemLoad)
    events.on('progress', this.onItemProgress)
  }

  componentWillUnmount() {
    const events = this.props.game.loader.events
    events.off('loadstart', this.onItemLoad)
    events.off('progress', this.onItemProgress)
  }

  onItemLoad = (item: any) => {
    const items = this.state.items.slice()
    for (let i = 0; i < items.length; ++i) {
      if (items[i] === item) {
        return
      }
    }

    items.push({
      name: item.name,
      progress: 0
    })

    this.setState({ items })
  }

  onItemProgress = (item: any) => {
    const items = this.state.items.slice()

    for (let i = 0; i < items.length; ++i) {
      if (items[i].name === item.name) {
        items[i].progress = item.progress
        break
      }
    }

    this.setState({ items })
  }

  formatItem(name: string, progress: number) {
    const status = Math.round(progress * 100) + '%'

    let length = 59 - name.length - status.length
    if (length < 2) {
      name = name.substr(0, 50)
      length = 9 - status.length
    }

    const dots = Array(length).join('.')

    return `${name}${dots}${status}`
  }

  render() {
    const className = `loading${this.props.visible ? '' : ' loading--hidden'}`

    return (
      <div class={className}>

        <div class="spinner">
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
            >
            </path>
          </svg>
        </div>

        <ul class="log">
          {this.state.items.map(item => (
            <li key={item.name}>{this.formatItem(item.name, item.progress)}</li>
          ))}
        </ul>

      </div>
    )
  }
}
