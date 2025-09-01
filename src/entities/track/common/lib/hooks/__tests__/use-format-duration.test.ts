import { renderHook } from '@testing-library/react';
import { useFormatDuration } from 'entities/track/common/lib/hooks/use-format-duration';

jest.mock('entities/locale/lib/hooks');

it.each([
  [{ hours: 22, minutes: 152, seconds: 59 }, '22ч 152м 59с'],
  [{ hours: 11, minutes: 650, seconds: 5 }, '11ч 650м 5с'],
  [{ hours: 74, minutes: 25, seconds: 623 }, '74ч 25м 623с'],
  [{ hours: 98, minutes: 0, seconds: 0 }, '98ч'],
  [{ hours: 22, minutes: 215, seconds: 0 }, '22ч 215м'],
  [{ hours: 0, minutes: 6666666, seconds: 0 }, '6666666м'],
  [{ hours: 0, minutes: 42, seconds: 52 }, '42м 52с'],
  [{ hours: 0, minutes: 0, seconds: 5632 }, '5632с'],
  [{ hours: 123, minutes: 0, seconds: 1 }, '123ч 1с'],
])('for "%s" should return "%s', async (duration, expected) => {
  const { result } = renderHook(() => useFormatDuration(duration));

  expect(result.current).toEqual(expected);
});
