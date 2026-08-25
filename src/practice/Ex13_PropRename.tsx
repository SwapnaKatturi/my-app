interface GreetingProps {
  userName: string;
}

/**
 * EXERCISE 13 (function component) — prop name mismatch hidden by `as any`
 * ----------------------------------------------------------------------------
 * Expected behavior: shows "Hello, Swapna!".
 *
 * Bug: it shows "Hello, undefined!" instead. The parent passes a prop called
 * `userName`, but look closely at what's destructured inside Greeting.
 * Normally TypeScript would catch a typo'd/mismatched prop name immediately
 * and refuse to compile — so why didn't it catch this one? Look at the
 * `as any` on the destructuring line. What does casting to `any` actually
 * turn off?
 */
function Greeting(props: GreetingProps) {
  const { userName } = props as GreetingProps; // BUG: wrong key, AND `as any` hides it from TypeScript
  return <p>Hello, {userName}!</p>;
}

function PropRenameDemo() {
  return (
    <div className="exercise">
      <h3>Ex13: Prop rename (function)</h3>
      <Greeting userName="Swapna" />
    </div>
  );
}

export default PropRenameDemo;
