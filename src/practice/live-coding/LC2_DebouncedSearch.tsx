
import { useEffect, useState } from "react";

/**
 * LC2 — Debounced search. See README.md in this folder for the full spec.
 *
 * Write the whole component yourself. Run the tests to check your work:
 *   npm test -- LC2_DebouncedSearch
 */
interface DebouncedSearchProps {
  onSearch: (query: string) => void;
  delay?: number;
}

function DebouncedSearch({ onSearch, delay = 300 }: DebouncedSearchProps) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      onSearch(search);
    }, delay);
    return () => clearTimeout(timerId);
  }, [search, delay])

  return (
    <div>
      <h3>Search input withh delay timeout</h3>
      <input type="text" value={search} placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}

export default DebouncedSearch;
