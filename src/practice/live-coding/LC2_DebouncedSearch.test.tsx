import { act, render, screen, fireEvent } from '@testing-library/react';
import DebouncedSearch from './LC2_DebouncedSearch';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('does not call onSearch immediately on change', () => {
  const onSearch = jest.fn();
  render(<DebouncedSearch onSearch={onSearch} delay={300} />);
  fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'a' } });
  expect(onSearch).not.toHaveBeenCalled();
});

test('calls onSearch once with the latest value after the delay', () => {
  const onSearch = jest.fn();
  render(<DebouncedSearch onSearch={onSearch} delay={300} />);
  const input = screen.getByPlaceholderText('Search...');

  fireEvent.change(input, { target: { value: 'a' } });
  fireEvent.change(input, { target: { value: 'ap' } });
  fireEvent.change(input, { target: { value: 'app' } });

  act(() => {
    jest.advanceTimersByTime(300);
  });

  expect(onSearch).toHaveBeenCalledTimes(1);
  expect(onSearch).toHaveBeenCalledWith('app');
});

test('typing again before the delay elapses resets the timer', () => {
  const onSearch = jest.fn();
  render(<DebouncedSearch onSearch={onSearch} delay={300} />);
  const input = screen.getByPlaceholderText('Search...');

  fireEvent.change(input, { target: { value: 'a' } });
  act(() => {
    jest.advanceTimersByTime(200);
  });
  // still within the debounce window — typing again should push it out further
  fireEvent.change(input, { target: { value: 'ab' } });
  act(() => {
    jest.advanceTimersByTime(200);
  });
  expect(onSearch).not.toHaveBeenCalled();

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSearch).toHaveBeenCalledTimes(1);
  expect(onSearch).toHaveBeenCalledWith('ab');
});
