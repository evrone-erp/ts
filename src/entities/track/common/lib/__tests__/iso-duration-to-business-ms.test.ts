import { TISODuration } from 'entities/track/common/model/types';
import { isoDurationToBusinessMs } from 'entities/track/common/lib/iso-duration-to-business-ms';
import {
  EXPECTED_BUSINESS_DAY_MS,
  EXPECTED_BUSINESS_WEEK_MS,
  EXPECTED_HOUR_MS,
  EXPECTED_MINUTE_MS,
} from './test-const';

const cases: Array<[TISODuration, number]> = [
  ['PT1H', 3.6e6],
  ['PT8H', EXPECTED_BUSINESS_DAY_MS],
  ['P1D', EXPECTED_BUSINESS_DAY_MS],
  ['P5D', EXPECTED_BUSINESS_WEEK_MS],
  ['P1W', EXPECTED_BUSINESS_WEEK_MS],
  ['P2W', EXPECTED_BUSINESS_WEEK_MS * 2],
  ['P10D', EXPECTED_BUSINESS_WEEK_MS * 2],
  ['P1W5D', EXPECTED_BUSINESS_WEEK_MS * 2],
  ['P1W6D', EXPECTED_BUSINESS_WEEK_MS * 2 + EXPECTED_BUSINESS_DAY_MS],
  [
    'P1W6DT20H30M',
    EXPECTED_BUSINESS_WEEK_MS * 2 + EXPECTED_BUSINESS_DAY_MS + EXPECTED_HOUR_MS * 20 + EXPECTED_MINUTE_MS * 30,
  ],
];
it.each(cases)('for "%s" returns "%i"', (str, expected) => {
  const res = isoDurationToBusinessMs(str);
  expect(res).toEqual(expected);
});
