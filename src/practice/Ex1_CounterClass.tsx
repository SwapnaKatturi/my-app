import { Component } from 'react';

/**
 * EXERCISE 1 (class component)
 * -----------------------------
 * Expected behavior: clicking "+1" should increase the number shown on screen.
 *
 * Bug: there's a mismatch somewhere between the state field's name and the
 * name used when reading/updating it. Find it and fix it.
 */
class CounterClass extends Component {
  state = {
    count: 0,
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div className="exercise">
        <h3>Ex1: Counter (class)</h3>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleIncrement}>+1</button>
      </div>
    );
  }
}

export default CounterClass;
