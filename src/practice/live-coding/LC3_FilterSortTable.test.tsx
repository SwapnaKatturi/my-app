import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterSortTable, { LineItem } from './LC3_FilterSortTable';

const items: LineItem[] = [
  { id: 1, name: 'Taxi', amount: 40 },
  { id: 2, name: 'Hotel', amount: 200 },
  { id: 3, name: 'Lunch', amount: 15 },
];

test('renders all rows initially', () => {
  render(<FilterSortTable items={items} />);
  expect(screen.getByText('Taxi')).toBeInTheDocument();
  expect(screen.getByText('Hotel')).toBeInTheDocument();
  expect(screen.getByText('Lunch')).toBeInTheDocument();
});

test('filters rows by name, case-insensitively', () => {
  render(<FilterSortTable items={items} />);
  userEvent.type(screen.getByPlaceholderText('Filter by name...'), 'ta');
  expect(screen.getByText('Taxi')).toBeInTheDocument();
  expect(screen.queryByText('Hotel')).not.toBeInTheDocument();
  expect(screen.queryByText('Lunch')).not.toBeInTheDocument();
});

test('clicking the Amount header sorts ascending, then descending', () => {
  render(<FilterSortTable items={items} />);
  const getRowNames = () =>
    screen.getAllByRole('row').slice(1).map((row) => row.querySelectorAll('td')[0].textContent);

  userEvent.click(screen.getByText('Amount'));
  expect(getRowNames()).toEqual(['Lunch', 'Taxi', 'Hotel']); // 15, 40, 200

  userEvent.click(screen.getByText('Amount'));
  expect(getRowNames()).toEqual(['Hotel', 'Taxi', 'Lunch']); // 200, 40, 15
});
