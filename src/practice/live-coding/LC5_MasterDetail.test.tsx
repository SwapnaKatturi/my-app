import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MasterDetail, { DetailItem } from './LC5_MasterDetail';

const items: DetailItem[] = [
  { id: 1, name: 'Taxi', description: 'Ride from the airport' },
  { id: 2, name: 'Hotel', description: 'Two nights downtown' },
];

test('shows a placeholder before anything is selected', () => {
  render(<MasterDetail items={items} />);
  expect(screen.getByText('Select an item')).toBeInTheDocument();
});

test('clicking an item shows its details and marks it selected', () => {
  render(<MasterDetail items={items} />);
  userEvent.click(screen.getByText('Taxi'));

  expect(screen.getByText('Ride from the airport')).toBeInTheDocument();
  expect(screen.getByText('Taxi')).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByText('Hotel')).toHaveAttribute('aria-pressed', 'false');
});

test('clicking a different item switches the details and the selection', () => {
  render(<MasterDetail items={items} />);
  userEvent.click(screen.getByText('Taxi'));
  userEvent.click(screen.getByText('Hotel'));

  expect(screen.getByText('Two nights downtown')).toBeInTheDocument();
  expect(screen.queryByText('Ride from the airport')).not.toBeInTheDocument();
  expect(screen.getByText('Hotel')).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByText('Taxi')).toHaveAttribute('aria-pressed', 'false');
});
