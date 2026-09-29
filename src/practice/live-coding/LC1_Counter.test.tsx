import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './LC1_Counter';

test('renders the initial count', () => {
  render(<Counter initial={5} />);
  expect(screen.getByText('Count: 5')).toBeInTheDocument();
});

test('defaults to 0 when no initial prop is given', () => {
  render(<Counter />);
  expect(screen.getByText('Count: 0')).toBeInTheDocument();
});

test('increments and decrements', () => {
  render(<Counter initial={5} />);
  userEvent.click(screen.getByLabelText('increment'));
  userEvent.click(screen.getByLabelText('increment'));
  userEvent.click(screen.getByLabelText('decrement'));
  expect(screen.getByText('Count: 6')).toBeInTheDocument();
});

test('reset returns to the initial prop value, not 0', () => {
  render(<Counter initial={5} />);
  userEvent.click(screen.getByLabelText('increment'));
  userEvent.click(screen.getByLabelText('increment'));
  userEvent.click(screen.getByText('Reset'));
  expect(screen.getByText('Count: 5')).toBeInTheDocument();
});
