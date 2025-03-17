import { renderHook } from '@testing-library/react';
import {
  TAllowedArgs,
  useISODurationsToTotalDurationData,
} from 'entities/track/common/lib/hooks/use-iso-dirations-to-total-duration-data';

it.each([
  ['P1WT2H', { hours: 42, minutes: 0, seconds: 0 }],
  [{ duration: 'P1W2DT2H' }, { hours: 58, minutes: 0, seconds: 0 }],
  [['P1WT2H', 'PT10H10M'], { hours: 52, minutes: 10, seconds: 0 }],
  [[{ duration: 'P1W' }, { duration: 'P5DT30M20S' }], { hours: 80, minutes: 30, seconds: 20 }],
  [['P3WT1H40M', { duration: 'P5DT30M20S' }], { hours: 162, minutes: 10, seconds: 20 }],
] as const)('for "%j" should return "%s"', (durations, expected) => {
  const { result } = renderHook(() => useISODurationsToTotalDurationData(durations as TAllowedArgs));

  expect(result.current).toEqual(expected);
});
