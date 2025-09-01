import { renderHook } from '@testing-library/react';
import { useISOToHumanReadableDuration } from 'entities/track/common/lib/hooks/use-iso-to-human-readable-duration';

jest.mock('entities/locale/lib/hooks');

it.each([
  ['P1W2DT3H', '59ч'],
  ['PT2H60M', '3ч'],
  ['PT30M', '30м'],
  ['PT30S', '30с'],
  ['PT30M60S', '31м'],
  ['PT30M59S', '30м 59с'],
  ['P1W5DT9H70M30S', '90ч 10м 30с'],
  ['P4W4DT4H40M30S', '196ч 40м 30с'],
] as const)('for "%s" should return "%s', async (duration, expected) => {
  const { result } = renderHook(() => useISOToHumanReadableDuration(duration));

  expect(result.current).toEqual(expected);
});
