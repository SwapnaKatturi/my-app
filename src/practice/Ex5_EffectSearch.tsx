import { useEffect, useState } from 'react';

/**
 * EXERCISE 5 (function component / hooks)
 * -----------------------------------------
 * Expected behavior: typing in the box updates "query", and a separate
 * "renderCount" ticker below should just show how many times this
 * component has rendered (it should NOT go up on its own).
 *
 * Bug: open the console — renderCount climbs rapidly on its own, way faster
 * than you're typing. Something about the effect's dependency list is wrong.
 */
function EffectSearch() {
  const [query, setQuery] = useState('');
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, [query]);

  return (
    <div className="exercise">
      <h3>Ex5: Search + render counter (hooks)</h3>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type something..."
      />
      <p>Query: {query}</p>
      <p>Render count: {renderCount}</p>
    </div>
  );
}

export default EffectSearch;
