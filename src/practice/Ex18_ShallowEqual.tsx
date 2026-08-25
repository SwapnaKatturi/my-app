import { useRef, useState } from 'react';

/**
 * EXERCISE 18 (function component) — deep vs. shallow equality
 * -----------------------------------------------------------
 * This isn't a bug to fix — it's a function to WRITE, so you can see
 * exactly what PureComponent (Ex9) was doing under the hood when it
 * decided "nothing changed" even though your array's contents grew.
 *
 * Task: implement shallowEqual(objA, objB) below. It should return true
 * only if both objects have the same keys, and every corresponding VALUE
 * is === equal to the other (one level deep — do NOT recurse into nested
 * objects/arrays, that's the whole point of "shallow").
 */
function shallowEqual(objA: Record<string, unknown>, objB: Record<string, unknown>): boolean {
    // your implementation here
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) => objA[key] === objB[key]);
}

function ShallowEqualDemo() {
    const [items, setItems] = useState<number[]>([1, 2, 3]);
    const prevItemsRef = useRef(items);
    const [lastResult, setLastResult] = useState<string>('(click a button)');

    const runCheck = (newItems: number[], label: string) => {
        const isEqual = shallowEqual({ items: prevItemsRef.current }, { items: newItems });
        setLastResult(`${label} → shallowEqual says: ${isEqual} (same reference? ${prevItemsRef.current === newItems})`);
        prevItemsRef.current = newItems;
        setItems(newItems);
    };

    return (
        <div className="exercise">
            <h3>Ex18: shallowEqual from scratch</h3>
            <p>Items: {items.join(', ')}</p>
            <button onClick={() => { items.push(items.length + 1); runCheck(items, 'Mutated in place'); }}>
                Mutate (bad)
            </button>
            <button onClick={() => runCheck([...items, items.length + 1], 'Created new array')}>
                Replace (good)
            </button>
            <p>{lastResult}</p>
        </div>
    );
}

export default ShallowEqualDemo;