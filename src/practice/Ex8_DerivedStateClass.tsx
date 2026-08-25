import { Component, useState } from 'react';

interface LabelSyncProps {
  label: string;
}

interface LabelSyncState {
  label: string;
  count: number;
}

/**
 * EXERCISE 8 (class component) — getDerivedStateFromProps
 * -----------------------------------------------------------
 * Expected behavior: click "+1" a few times, then click "Switch label".
 * Since the label changed, the counter should reset to 0 — that's the whole
 * point of syncing state from props here.
 *
 * Bug: nothing crashes. Click "Switch label" and... the count just keeps
 * going, ignoring the label change entirely. The lifecycle method that's
 * supposed to catch this is written correctly on the inside — but React
 * never calls it at all. Why would React silently skip a method that's
 * spelled correctly?
 */
class LabelSync extends Component<LabelSyncProps, LabelSyncState> {
  state: LabelSyncState = { label: this.props.label, count: 0 };

  // BUG: this needs to be `static` — React only recognizes
  // getDerivedStateFromProps as a lifecycle hook when it's a static method.
  // As a regular instance method, it's just... a method that never gets called.
  static getDerivedStateFromProps(props: LabelSyncProps, state: LabelSyncState) {
    if (props.label !== state.label) {
      return { label: props.label, count: 0 };
    }
    return null;
  }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>
          {this.props.label}: {this.state.count}
        </p>
        <button onClick={this.handleIncrement}>+1</button>
      </div>
    );
  }
}

function DerivedStateDemo() {
  const [label, setLabel] = useState('Counter A');

  return (
    <div className="exercise">
      <h3>Ex8: Derived state sync (class)</h3>
      <LabelSync label={label} />
      <button onClick={() => setLabel(label === 'Counter A' ? 'Counter B' : 'Counter A')}>
        Switch label
      </button>
    </div>
  );
}

export default DerivedStateDemo;
