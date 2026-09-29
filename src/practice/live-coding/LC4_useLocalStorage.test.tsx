import { act, renderHook } from '@testing-library/react';
import useLocalStorage from './LC4_useLocalStorage';

beforeEach(() => {
  window.localStorage.clear();
});

test('returns the default value when localStorage is empty', () => {
  const { result } = renderHook(() => useLocalStorage('color', 'blue'));
  expect(result.current[0]).toBe('blue');
});

test('reads an existing value from localStorage on init', () => {
  window.localStorage.setItem('color', JSON.stringify('green'));
  const { result } = renderHook(() => useLocalStorage('color', 'blue'));
  expect(result.current[0]).toBe('green');
});

test('setter updates the returned value and persists to localStorage', () => {
  const { result } = renderHook(() => useLocalStorage('color', 'blue'));

  act(() => {
    result.current[1]('red');
  });

  expect(result.current[0]).toBe('red');
  expect(window.localStorage.getItem('color')).toBe(JSON.stringify('red'));
});
