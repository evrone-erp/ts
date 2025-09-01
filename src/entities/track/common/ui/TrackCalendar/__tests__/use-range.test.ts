import { renderHook } from '@testing-library/react';
import { useRange } from 'entities/track/common/ui/TrackCalendar/use-range';

it.each([
  ['2023-01-30T13:10:45.000Z', '2023-01-30T16:30:25.000Z', true, ['2023-01-30T00:00:00+03:00']],
  [
    '2023-01-30T13:10:45.000Z',
    '2023-02-02T23:10:45.000Z',
    true,
    [
      '2023-01-30T00:00:00+03:00',
      '2023-01-31T00:00:00+03:00',
      '2023-02-01T00:00:00+03:00',
      '2023-02-02T00:00:00+03:00',
    ],
  ],
  [
    '2023-11-30T13:10:45.000Z',
    '2023-12-04T23:10:45.000Z',
    false,
    ['2023-11-30T00:00:00+03:00', '2023-12-01T00:00:00+03:00', '2023-12-04T00:00:00+03:00'],
  ],
])('when from=%s to=%s showWeekends=%s should return correct range', (from, to, showWeekends, expected) => {
  const { result } = renderHook(() => useRange({ from, to, showWeekends, utcOffsetInMinutes: undefined }));

  expect(result.current).toEqual(expected);
});
