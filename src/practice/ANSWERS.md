# Answer Key — don't peek until you've tried each one

## Ex1 — CounterClass (class)
**Bug:** `this.setState({ cnt: ... })` sets a key `cnt` that doesn't exist in state (`count` does). React merges it in as a new, unused field, so the displayed `count` never changes.
**Fix:** `this.setState({ count: this.state.count + 1 })`.

## Ex2 — ToggleClass (class)
**Bug:** `handleClick` is a regular method, not bound to the instance, and it's passed as `onClick={this.handleClick}` — when React calls it later, `this` is `undefined`.
**Fix:** either bind it in the constructor (`this.handleClick = this.handleClick.bind(this)`), or convert it to a class field arrow function (`handleClick = () => { ... }`), or bind inline at render (`onClick={() => this.handleClick()}`).

## Ex3 — TimerClass (class)
**Bug:** `setInterval` is started in `componentDidMount` but never cleared. On unmount it keeps firing and calls `setState` on a dead component (warning/leak); if the exercise page mounts more than once you also get multiple overlapping intervals.
**Fix:** save the interval id (e.g. `this.intervalId = setInterval(...)`) and clear it in `componentWillUnmount`: `clearInterval(this.intervalId)`.

## Ex4 — CounterHooks (function)
**Bug:** two separate state variables, `count` and `total`. The click handler updates `count`, but the JSX renders `total` — which never changes, so nothing appears to happen. No error is ever thrown, which is what makes this one sneaky: you have to compare the variable used in the *handler* against the variable used in the *render* line by line.
**Fix:** render `count` instead of `total` (or drop `total` entirely — it's dead state).

## Ex5 — EffectSearch (function)
**Bug:** `useEffect(() => { setRenderCount(...) })` has no dependency array, so it runs after *every* render — and since it calls `setRenderCount`, that triggers another render, which runs the effect again, forever.
**Fix:** give it an empty dependency array `[]` so it only runs once on mount — or better, just derive the render count with a `useRef` if you don't want it to trigger effects at all.

## Ex6 — ListRenderer (function)
**Bug:** `todo.id === todo.id` compares the item to itself (always `true`), so every todo toggles at once, instead of comparing against the clicked `id` argument.
**Fix:** `todo.id === id ? { ...todo, done: !todo.done } : todo`.

## Ex7 — FilterFormClass (class) — mirrors a real test bug
**Bug:** `filterOnSubmit` is a plain class method, passed as a bare reference: `onClick={this.filterOnSubmit}`. React calls it later with no instance attached, so `this` is `undefined` inside it, and `this.state` throws.
**Fix:** same three options as Ex2 — turn it into a class field arrow function (`filterOnSubmit = (e) => { ... }`), or bind it in the constructor, or wrap it inline: `onClick={(e) => this.filterOnSubmit(e)}`.
**How to recognize this shape fast:** error says `Cannot read properties of undefined (reading 'state')` (or any other field), the crash site is inside a class method, and that method is used somewhere in `render()` as `onClick={this.foo}` / `onSubmit={this.foo}` / passed down as a prop like `<Child onDone={this.foo} />` without `.bind` or an arrow wrapper.

---

# Set 2

## Ex8 — DerivedStateClass (class)
**Bug:** `getDerivedStateFromProps` is written correctly on the inside, but it's missing the `static` keyword. React only ever calls a method with that exact name if it's declared `static` — as a regular instance method it's just dead code that nothing ever invokes. So when the `label` prop changes, nothing resets `count`.
**Fix:** `static getDerivedStateFromProps(props: LabelSyncProps, state: LabelSyncState) { ... }`.
**Lesson:** several React lifecycle methods (`getDerivedStateFromProps`, `getDerivedStateFromError`) only work as `static` methods. Get the modifier wrong and React silently ignores the method — no warning, no error, it just never runs.

## Ex9 — PureComponentMutation (class)
**Bug:** `this.state.items.push(...)` mutates the existing array in place, then `setState({ items: this.state.items })` hands back the *same array reference* it already had. `PureComponent` decides whether to re-render by shallowly comparing the old and new state — since `items` is literally the same object (`===`), it concludes "nothing changed" and skips rendering, even though the array's contents did change.
**Fix:** build a new array instead of mutating: `this.setState({ items: [...this.state.items, `Item ${this.state.items.length + 1}`] })`.
**Lesson:** this is why React (and Redux, and most state libraries) insist on immutable updates — `PureComponent`/`React.memo`'s whole optimization is built on reference comparison, and mutation defeats it silently.

## Ex10 — AsyncUnmountClass (class)
**Bug:** `componentDidMount` kicks off a promise (standing in for a real fetch) and calls `this.setState(...)` in `.then()` with no check that the component is still around. If you unmount before the promise resolves, the callback still fires later and calls `setState` on a component that no longer exists.
**Important note for this project's React version (19.x):** React 18+ removed the console warning for this — it's now a silent no-op, so you won't see anything printed even with the bug fully present. Add a temporary `console.log(...)` as the first line inside `.then()` to prove to yourself the callback still runs after unmount; that log firing (with no visible effect on screen) IS the bug.
**Fix:** track a mounted flag and check it before updating state:
```js
componentDidMount() {
  this._isMounted = true;
  promise.then((result) => {
    if (this._isMounted) this.setState({ data: result });
  });
}
componentWillUnmount() {
  this._isMounted = false;
}
```
**Lesson:** `componentWillUnmount` (or an effect cleanup function in hooks) isn't just for timers/intervals — any async work that outlives the component (fetches, subscriptions, promises) needs the same guard, or a way to cancel it outright (e.g. `AbortController` for real fetches).

## Ex11 — UseRefMisuse (function)
**Bug:** `countRef.current += 1` does update the ref's value (the console.log proves it), but mutating a ref's `.current` never triggers a re-render — React only re-renders in response to a state update (`useState`'s setter, or a class's `setState`). The DOM just never gets told anything changed.
**Fix:** use `useState` instead: `const [count, setCount] = useState(0); ... setCount((c) => c + 1);`.
**Lesson:** `useRef` is for values you want to persist across renders WITHOUT causing a re-render (DOM node handles, interval IDs, "previous value" tracking). The moment a value needs to appear in the UI, it belongs in state, not a ref.

## Ex12 — UseCallbackStale (function)
**Bug:** `useCallback(() => { console.log(count) }, [])` — the empty dependency array tells React "never recreate this function." So the function keeps referencing the `count` variable from the render where it was first created (when `count` was `0`), forever — a stale closure. This is the same mechanism as Ex5's runaway effect, just applied to `useCallback` instead of `useEffect`: both hooks take a dependency array, and both silently do the wrong thing if that array is wrong.
**Fix:** `}, [count]);` so the function is recreated (with the current `count` baked in) whenever `count` changes.
**Lesson:** any hook with a dependency array (`useEffect`, `useCallback`, `useMemo`) closes over the values from the render it was created in. Missing a dependency doesn't (usually) crash anything — it just quietly freezes a value in time.

## Ex13 — PropRename (function)
**Bug:** the parent passes `userName="Swapna"`, but `Greeting` destructures `{ username }` — different casing, so it reads `undefined`. Normally TypeScript's prop types would catch this immediately at compile time (since `GreetingProps` only has `userName`, not `username`). But the code does `props as any` before destructuring, which tells TypeScript "trust me, stop checking this" — so the mismatch sails through uncaught.
**Fix:** drop the `as any` and destructure the real prop: `const { userName } = props;`. Once you remove the cast, TypeScript would have flagged `username` as a typo on its own.
**Lesson:** `as any` (and `@ts-ignore`) don't fix type errors — they just blindfold the type checker at that exact spot. Treat every `as any` in a codebase as a place a bug like this one could be hiding.
