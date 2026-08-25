import { Component } from 'react';

/**
 * EXERCISE 2 (class component)
 * -----------------------------
 * Expected behavior: clicking the button toggles the text between "ON" and "OFF".
 *
 * Bug: clicking the button throws an error in the console
 * ("Cannot read properties of undefined (reading 'setState')").
 * Something about how the handler is wired up to the class instance is wrong.
 */
interface ToggleState {
  isOn: boolean;
}

class ToggleClass extends Component<{}, ToggleState> {
  constructor(props: {}) {
    super(props);
    this.state = { isOn: false };
    // handleClick is intentionally NOT bound here
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isOn: !this.state.isOn });
  }

  render() {
    return (
      <div className="exercise">
        <h3>Ex2: Toggle (class)</h3>
        <p>Status: {this.state.isOn ? 'ON' : 'OFF'}</p>
        <button onClick={this.handleClick}>Toggle</button>
      </div>
    );
  }
}

export default ToggleClass;
