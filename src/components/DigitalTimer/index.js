// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {minutes: 25, seconds: 0, isStart: false}

  componentWillUnmount = () => {
    clearInterval(this.intervalId)
  }

  increaseMinutes = () => {
    const {isStart} = this.state
    if (!isStart) {
      this.setState(state => ({
        minutes: state.minutes + 1,
      }))
    }
  }

  decreaseMinutes = () => {
    const {isStart, minutes} = this.state
    if (!isStart && minutes > 0) {
      this.setState(state => ({
        minutes: state.minutes - 1,
      }))
    }
  }

  resetBtn = () => {
    clearInterval(this.intervalId)
    this.setState({minutes: 25, seconds: 0, isStart: false})
  }

  start = () => {
    const {isStart} = this.state
    if (!isStart) {
      this.intervalId = setInterval(() => {
        const {minutes, seconds} = this.state

        const totalSeconds = minutes * 60 + seconds - 1
        console.log(totalSeconds)
        console.log(seconds)

        if (totalSeconds >= 0) {
          const remainMin = Math.floor(totalSeconds / 60)
          const remainSec = Math.floor(totalSeconds % 60)

          this.setState({minutes: remainMin, seconds: remainSec})
        }
      }, 1000)
      this.setState({isStart: true})
    } else {
      clearInterval(this.intervalId)
      this.setState({isStart: false})
    }
  }

  render() {
    const {minutes, seconds, isStart} = this.state
    return (
      <div className="bg-card">
        <h1>Digital Timer</h1>
        <div className="card">
          <div className="image-card">
            <div className="display-card">
              <h1 className="text-content">
                {minutes < 9 ? `0${minutes} ` : minutes}:
                {seconds < 9 ? `0${seconds}` : seconds}
              </h1>
              <p>{isStart ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div>
            <div className="start-reset-card">
              <img
                src={
                  isStart
                    ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                }
                alt={isStart ? 'pause icon' : 'play icon'}
              />

              <button onClick={this.start} type="button" className="button">
                {isStart ? 'Pause' : 'Start'}
              </button>

              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
                onClick={this.resetBtn}
              />
              <button type="button" className="button" onClick={this.resetBtn}>
                Reset
              </button>
            </div>
            <div>
              <p>Set Timer Limit</p>
              <div className="increase-decrease-card">
                <button
                  onClick={this.decreaseMinutes}
                  className="start-reset-button"
                  type="button"
                  disabled={isStart}
                >
                  -
                </button>
                <p type="button">{minutes}</p>
                <button
                  onClick={this.increaseMinutes}
                  className="start-reset-button"
                  type="button"
                  disabled={isStart}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
