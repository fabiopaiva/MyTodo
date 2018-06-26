// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import hurry from './hurry.mp3'

const styles = {
  hurry: {
    color: red[800],
    fontWeight: 'bold',
  },
}

type Props = {
  time: string,
  classes: Object,
}

type State = {
  remaining: number,
  audioPlayed: boolean,
  shouldPlay: boolean,
}

class TodoCountDown extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const remaining = ((new Date(props.time)).getTime() - Date.now())
    this.state = {
      remaining,
      audioPlayed: false,
      shouldPlay: remaining - (60 * 60 * 1000) > 0,
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { time } = this.props
      const { shouldPlay, audioPlayed } = this.state
      const remaining = ((new Date(time)).getTime() - Date.now())
      if (shouldPlay && !audioPlayed && remaining - (60 * 60 * 1000) < 0 && this.audioRef) {
        this.audioRef.play()
        this.setState({ audioPlayed: true })
      }
      this.setState({
        remaining,
      })

    }, 1000)
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  handleAudioRef = (ref) => {
    this.audioRef = ref
  }

  interval: ?IntervalID

  audioRef: ?HTMLAudioElement

  // eslint-disable-next-line class-methods-use-this
  format(time: number) {
    let timeRemaining = parseInt(time / 1000, 10)

    const hours = parseInt(timeRemaining / 3600, 10)
    timeRemaining %= 3600

    const minutes = parseInt(timeRemaining / 60, 10)
    timeRemaining %= 60

    const seconds = parseInt(timeRemaining, 10)

    return `${
      hours.toString().padStart(2, '0')
    }:${
      minutes.toString().padStart(2, '0')
    }:${
      seconds.toString().padStart(2, '0')
    }`
  }

  render() {
    const { classes } = this.props
    const { remaining } = this.state
    const shouldHurryUp = remaining - (60 * 60 * 1000) < 0
    return (
      <span className={shouldHurryUp ? classes.hurry : ''}>
        {this.format(remaining)}
        <audio ref={this.handleAudioRef}>
          <source src={hurry} type="audio/mpeg" />
        </audio>
      </span>
    )
  }
}

export default withStyles(styles)(TodoCountDown)
