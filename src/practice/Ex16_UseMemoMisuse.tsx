import { useMemo, useState } from 'react';

/**
 * EXERCISE 16 (function component) — useMemo vs useCallback
 * -----------------------------------------------------------
 * Expected behavior: "Expensive total" should only recalculate when you
 * click "+1" (i.e. when `count` actually changes) — NOT every time you
 * type in the unrelated text box below it.
 *
 * Bug: open the console. Type a few characters into the text box — you'll
 * see "Recalculating total..." logged on EVERY keystroke, even though
 * nothing about `count` changed. The wrong hook is being used for the job.
 */

function fakeExpensiveCalculation(count: number) {
    console.log('recalculationg total....');
    let total = 0;
    for (let i = 0; i < count * 1000; i++) {
        total += i;

    }
    return total;

}

function UseMemoMisuse() {
    const [count, setCount] = useState(1);
    const [text, setText] = useState('');

    const total = useMemo(() => fakeExpensiveCalculation(count), [count]);

    return (
        <div className='exercise'>
            <h3>Ex16: useMemo vs useCallback</h3>
            <p>Expensive total: {total}</p>
            <button onClick={() => setCount(count + 1)}>+1(count:{count})</button>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder='Type here...' />
        </div>
    )

}

export default UseMemoMisuse;