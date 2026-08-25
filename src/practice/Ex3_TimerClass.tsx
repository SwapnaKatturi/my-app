import { Component } from 'react';

interface TimerState {
  seconds: number;
}

/**
 * EXERCISE 3 (class component)
 * -----------------------------
 * Expected behavior: "seconds" should count up by 1, once per second, forever,
 * and stop cleanly when the component is removed from the page.
 *
 * Bug: open the browser console. The tab either freezes or you see a warning
 * about updating an unmounted component / a runaway timer. Two lifecycle
 * methods are involved here — one of them is missing/wrong.
 */
class TimerClass extends Component<{}, TimerState> {
  state: TimerState = { seconds: 0 };
  intervalId: ReturnType<typeof setInterval> | undefined;

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div className="exercise">
        <h3>Ex3: Timer (class)</h3>
        <p>Seconds: {this.state.seconds}</p>
      </div>
    );
  }
}

export default TimerClass;
