// @flow
import React from 'react'

type Props = {
  time: string,
}

type State = {
  remaining: number,
}

export default class TodoCountDown extends React.Component<Props, State> {
  interval: IntervalID = 0

  constructor(props: Props) {
    super(props)
    this.state = {
      remaining: ((new Date(props.time)).getTime() - Date.now()),
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { time } = this.props
      this.setState({
        remaining: ((new Date(time)).getTime() - Date.now()),
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

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
    const { remaining } = this.state
    return (
      this.format(remaining)
    )
  }
}
