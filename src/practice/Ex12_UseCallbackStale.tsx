import { useCallback, useState } from 'react';

/**
 * EXERCISE 12 (function component / hooks) — useCallback stale closure
 * -----------------------------------------------------------------------
 * Expected behavior: click "+1" a few times (watch "Count" go up correctly),
 * then click "Log count" — it should log whatever the count currently is.
 *
 * Bug: open the console. No matter how many times you clicked "+1" first,
 * "Log count" always logs 0. The "Count: N" text on screen is correct, so
 * state itself is fine — the bug is only in what the logging function
 * "remembers". This is the exact same family of bug as Ex5's runaway
 * useEffect, just showing up in useCallback instead — same fix shape too.
 */
function CallbackLogger() {
  const [count, setCount] = useState(0);

  const logCount = useCallback(() => {
    console.log('Current count is:', count);
  }, [count]); // BUG: empty dependency array freezes `count` at its value when this ran once

  return (
    <div className="exercise">
      <h3>Ex12: Callback logger (hooks)</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <button onClick={logCount}>Log count</button>
    </div>
  );
}

export default CallbackLogger;
