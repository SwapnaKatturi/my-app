import { useState } from 'react';

/**
 * EXERCISE 11 (function component / hooks) — ref vs state
 * -----------------------------------------------------------
 * Expected behavior: clicking the button increases the "Clicks" number
 * shown on screen.
 *
 * Bug: open the console and click the button a few times. The console log
 * proves the number IS going up internally — but the screen never updates.
 * `useRef` is being used here for something that needs to show up in the UI.
 * What's the one thing updating a ref's `.current` does NOT do, that
 * `useState`'s setter always does?
 */
function ClickCounterRef() {

  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);

  };

  return (
    <div className="exercise">
      <h3>Ex11: Click counter (ref misuse)</h3>
      <p>Clicks: {count}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default ClickCounterRef;
