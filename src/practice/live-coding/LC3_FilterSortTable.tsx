import { useState } from "react";

/**
 * LC3 — Filter + sort table. See README.md in this folder for the full spec.
 *
 * Write the whole component yourself. Run the tests to check your work:
 *   npm test -- LC3_FilterSortTable
 */
export interface LineItem {
  id: number;
  name: string;
  amount: number;
}

interface FilterSortTableProps {
  items: LineItem[];
}

function FilterSortTable({ items }: FilterSortTableProps) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'asc' | 'desc' | null>(null);

  const filteredItems = items.filter((item) => {
    if (item.name.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    return false;
  })

  const sortedItems = [...filteredItems];
  const sortFunction = () => {
    if (sort === 'asc') {
      sortedItems.sort((a, b) => {
        return a.amount - b.amount;
      })
    } else if (sort === 'desc') {
      sortedItems.sort((a, b) => {
        return b.amount - a.amount;
      })
    }
  }
  sortFunction();
  const toggleSort = () => {
    if (sort === 'asc') {
      setSort('desc');
    } else if (sort === 'desc') {
      setSort('asc');
    } else {
      setSort('asc');
    }
  }

  return (
    <div>
      <h3>Sort + Filter funtionality</h3>
      <input value={search} placeholder="Filter by name..." onChange={(e) => setSearch(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th onClick={() => toggleSort()}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems && sortedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FilterSortTable;
