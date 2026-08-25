/**
 * EXERCISE 19 (function component) — event loop / microtask ordering
 * -----------------------------------------------------------
 * No bug here. Before you click "Run", write down (on paper or in your
 * head) the order you think these four console.logs will print in.
 * THEN click, check the console, and see if you predicted correctly.
 */
function EventLoopOrder() {
    const runDemo = () => {
        console.log('1: synchronous start');

        setTimeout(() => {
            console.log('2: setTimeout callback');
        }, 0);

        Promise.resolve().then(() => {
            console.log('3: promise .then callback');
        });

        console.log('4: synchronous end');
    };

    return (
        <div className="exercise">
            <h3>Ex19: Event loop order</h3>
            <p>Predict the console order FIRST, then click Run.</p>
            <button onClick={runDemo}>Run</button>
        </div>
    );
}

export default EventLoopOrder;