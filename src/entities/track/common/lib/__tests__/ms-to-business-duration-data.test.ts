import { msToBusinessDurationData } from 'entities/track/common/lib/ms-to-business-duration-data';
import {
  EXPECTED_BUSINESS_DAY_MS,
  EXPECTED_BUSINESS_WEEK_MS,
  EXPECTED_HOUR_MS,
  EXPECTED_MINUTE_MS,
} from './test-const';

it.each([
  [EXPECTED_BUSINESS_DAY_MS, { hours: 8, minutes: 0, seconds: 0 }],
  [EXPECTED_BUSINESS_WEEK_MS, { hours: 40, minutes: 0, seconds: 0 }],
  [EXPECTED_HOUR_MS, { hours: 1, minutes: 0, seconds: 0 }],
  [2 * EXPECTED_BUSINESS_WEEK_MS, { hours: 80, minutes: 0, seconds: 0 }],
  [EXPECTED_BUSINESS_DAY_MS * 4, { hours: 32, minutes: 0, seconds: 0 }],
  [EXPECTED_BUSINESS_DAY_MS * 4 + EXPECTED_MINUTE_MS * 30 + 50000, { hours: 32, minutes: 30, seconds: 50 }],
  [EXPECTED_BUSINESS_DAY_MS * 6 + EXPECTED_MINUTE_MS * 60 + 4000, { hours: 49, minutes: 0, seconds: 4 }],
  [
    EXPECTED_BUSINESS_DAY_MS * 3 + EXPECTED_HOUR_MS * 10 + EXPECTED_MINUTE_MS * 125 + 70000,
    { hours: 36, minutes: 6, seconds: 10 },
  ],
  [EXPECTED_BUSINESS_DAY_MS * 3 + EXPECTED_HOUR_MS * 10 + 75000, { hours: 34, minutes: 1, seconds: 15 }],
  [
    EXPECTED_BUSINESS_WEEK_MS + EXPECTED_BUSINESS_DAY_MS * 3 + EXPECTED_HOUR_MS * 8 + 23000,
    { hours: 72, minutes: 0, seconds: 23 },
  ],
  [5000, { hours: 0, minutes: 0, seconds: 5 }],
])('for "%i" should returns "%s"', (ms, expected) => {
  const result = msToBusinessDurationData(ms);

  expect(result).toEqual(expected);
});
