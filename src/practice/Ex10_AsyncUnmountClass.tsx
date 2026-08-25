import { Component, useState } from 'react';

interface State {
  data: string | null;
}

/**
 * EXERCISE 10 (class component) — async work vs. unmounting
 * -----------------------------------------------------------
 * Expected behavior: the loader shows "Loading..." then, ~2 seconds later,
 * shows "Loaded data!".
 *
 * Bug: click "Unmount before it loads" right after this loads (within the
 * first 2 seconds), then wait past 2 seconds.
 *
 * NOTE on this React version (19.x): React 18+ removed the console warning
 * that used to fire for "setState on an unmounted component" — it's now a
 * completely silent no-op. So you won't see anything in the console proving
 * this ran late. To actually OBSERVE the bug, add a temporary
 * `console.log('promise resolved, calling setState')` as the first line
 * inside the `.then(...)` callback, then repeat the unmount-then-wait steps —
 * you'll see it log even though the component was removed from the page
 * seconds earlier. That's the leak: the promise doesn't know or care that
 * the component is gone, and neither did this code, until you add a check.
 *
 * This is the SAME root idea as Ex3's timer leak, but with a one-shot async
 * call (like a real API request) instead of a repeating interval — so the
 * fix looks a little different. What flag could this component check before
 * trusting that it's safe to call setState?
 */
class AsyncLoader extends Component<{}, State> {
  state: State = { data: null };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    // simulates an API call
    new Promise<string>((resolve) => {
      setTimeout(() => resolve('Loaded data!'), 2000);
    }).then((result) => {

      // BUG: no check that the component is still mounted before calling setState
      if (result && this._isMounted) {
        console.log('promise resolved,calling setstate');

        this.setState({ data: result });
      }
    });
  }

  componentWillUnmount(): void {
    this._isMounted = false;
  }

  render() {
    return <p>Data: {this.state.data ?? 'Loading...'}</p>;
  }
}

function AsyncLoaderDemo() {
  const [show, setShow] = useState(true);

  return (
    <div className="exercise">
      <h3>Ex10: Async load vs. unmount (class)</h3>
      {show && <AsyncLoader />}
      <button onClick={() => setShow(false)}>Unmount before it loads</button>
    </div>
  );
}

export default AsyncLoaderDemo;
