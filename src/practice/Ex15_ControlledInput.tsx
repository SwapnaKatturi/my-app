import { useState } from 'react';

/**
 * EXERCISE 15 (function component) — controlled input, missing onChange
 * -----------------------------------------------------------
 * Expected behavior: you can type freely into the box, and "Clear" empties
 * it instantly.
 *
 * Bug: try typing into the box. Nothing appears — not one single character,
 * no matter how you type. Open the console too — React is telling you
 * exactly what's wrong, in plain English.
 */

function ControlledInput() {
    const [text, setText] = useState('');
    return (
        <div className="exercise">
            <h3>Ex15: Controlled Input</h3>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={() => setText('')}>Clear</button>
            <p>You typed: {text}</p>
        </div>
    )
}

//The input is controlled — React always forces its displayed value to match the value prop. Since there's no onChange to update state when I type, text never changes, so React keeps re-applying the old (empty) value on every render, wiping out each keystroke before it's visible."

export default ControlledInput;