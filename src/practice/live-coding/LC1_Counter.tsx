import { useState } from "react";

/**
 * LC1 — Counter with reset. See README.md in this folder for the full spec.
 *
 * Write the whole component yourself. Run the tests to check your work:
 *   npm test -- LC1_Counter
 */
interface CounterProps {
  initial?: number;
}

function Counter({ initial = 0 }: CounterProps) {
  const [count, setCount] = useState(initial);


  return (
    <div>
      <h3>Counter</h3>
      <p>Count: {count}</p>
      <button aria-label="increment" onClick={() => setCount(count + 1)}>Increment</button>
      <button aria-label="decrement" onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(initial)}>Reset</button>
    </div>
  );
}

export default Counter;
