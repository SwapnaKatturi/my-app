import { PureComponent } from 'react';

interface State {
  items: string[];
}

/**
 * EXERCISE 9 (class component) — PureComponent + mutation
 * -----------------------------------------------------------
 * Expected behavior: clicking "Add item" adds a new line to the list below.
 *
 * Bug: click "Add item" a bunch of times. Nothing happens on screen — the
 * list just stays stuck at "Apples" forever. No error, no warning. This
 * component extends PureComponent instead of Component on purpose — that's
 * the clue. PureComponent skips re-rendering when it thinks state "didn't
 * change". What would make it think that, even though addItem clearly runs
 * every time you click?
 */
class ItemListPure extends PureComponent<{}, State> {
  state: State = { items: ['Apples'] };

  addItem = () => {
    // BUG: mutates the existing array in place instead of creating a new one.
    this.setState({ items: [...this.state.items, `Item ${this.state.items.length + 1}`] });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <button onClick={this.addItem}>Add item</button>
      </div>
    );
  }
}

function PureComponentDemo() {
  return (
    <div className="exercise">
      <h3>Ex9: PureComponent + mutation (class)</h3>
      <ItemListPure />
    </div>
  );
}

export default PureComponentDemo;
