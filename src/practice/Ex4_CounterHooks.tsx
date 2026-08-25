import { useState } from 'react';

/**
 * EXERCISE 4 (function component / hooks)
 * -----------------------------------------
 * Expected behavior: clicking "+1" increases the count shown on screen.
 *
 * Bug: nothing crashes, nothing errors — the number on screen just never
 * moves. There are two very similar-looking state variables here; the click
 * handler updates one of them, and the render updates a different one.
 */
function CounterHooks() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div className="exercise">
      <h3>Ex4: Counter (hooks)</h3>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>+1</button>
    </div>
  );
}

export default CounterHooks;
