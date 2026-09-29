# Live-coding practice set

Five assessment-style exercises. Each has a **spec** (this file), a **stub
component** you edit, and a **test file** you should NOT edit — it's the
acceptance criteria, same as a hiring test.

## How to run

Run everything in this folder in watch mode:

```bash
npm test -- --testPathPattern=live-coding
```

Or a single exercise:

```bash
npm test -- LC1_Counter
```

Open the stub file, implement it, save — the test re-runs automatically.
Don't move on until it's green. Try each one cold (no peeking at ANSWERS.md
style hints) before asking for help.

---

## LC1 — Counter with reset
**File:** `LC1_Counter.tsx`
Build `<Counter initial={n} />`.
- Shows the current count.
- "+" increments by 1, "−" decrements by 1.
- "Reset" returns to the `initial` prop value — **not** hardcoded 0. This is
  the trap: it's easy to reset to `0` and pass the test that uses
  `initial={0}` while silently failing the one that uses `initial={5}`.

## LC2 — Debounced search
**File:** `LC2_DebouncedSearch.tsx`
Build `<DebouncedSearch onSearch={fn} delay={300} />`.
- Renders a text input (placeholder `"Search..."`).
- Calls `onSearch(value)` only after the user stops typing for `delay` ms.
- Typing again before `delay` elapses must reset the timer — `onSearch`
  should NOT fire once per keystroke.

## LC3 — Filter + sort table
**File:** `LC3_FilterSortTable.tsx`
Build `<FilterSortTable items={[{id, name, amount}, ...]} />`.
- A search input that filters rows by `name` (case-insensitive substring).
- A table with "Name" and "Amount" columns.
- Clicking the "Amount" column header sorts ascending; clicking again sorts
  descending (toggle).

## LC4 — `useLocalStorage` hook
**File:** `LC4_useLocalStorage.ts`
Build `useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void]`.
- Behaves like `useState`, but on first mount reads an existing value from
  `localStorage[key]` if one exists (JSON-parsed), otherwise falls back to
  `defaultValue`.
- The returned setter updates state **and** writes the new value to
  `localStorage[key]` (JSON-stringified).

## LC5 — Master-detail
**File:** `LC5_MasterDetail.tsx`
Build `<MasterDetail items={[{id, name, description}, ...]} />`.
- Renders the list of item names (as buttons).
- Before anything is selected, the detail area shows the text
  `"Select an item"`.
- Clicking a name shows that item's `name` and `description` in the detail
  area, and marks the clicked button as selected (`aria-pressed="true"`).
- Clicking a different item switches the detail area and moves the
  `aria-pressed="true"` to the newly-clicked button only.
