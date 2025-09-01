import { TISODuration } from 'entities/track/common/model/types';
import {
  ISO_DURATION_REGEX,
  MILLISECONDS_A_BUSINESS_DAY,
  MILLISECONDS_A_BUSINESS_WEEK,
  MILLISECONDS_A_HOUR,
  MILLISECONDS_A_MINUTE,
  MILLISECONDS_A_SECOND,
} from './constants';

const unitToMS = {
  weeks: MILLISECONDS_A_BUSINESS_WEEK,
  days: MILLISECONDS_A_BUSINESS_DAY,
  hours: MILLISECONDS_A_HOUR,
  minutes: MILLISECONDS_A_MINUTE,
  seconds: MILLISECONDS_A_SECOND,
  milliseconds: 1,
};

/**
 * transforms ISO duration e.g. P2W3DT30H2M10S to milliseconds, accounting for business days and business weeks.
 * here we assume business day = 8 hours and business week = 5 days
 * @param duration
 */
export const isoDurationToBusinessMs = (duration: TISODuration) => {
  const match = duration.match(ISO_DURATION_REGEX);

  if (!match) {
    return null;
  }

  const properties = match.slice(2);
  const numberD = properties.map((value) => (value != null ? Number(value) : 0));

  // we ignore months and years, because Yandex Tracker doesn't send them, and it's hard to calculate "business month" or "business year"
  const data = {
    weeks: numberD[2],
    days: numberD[3],
    hours: numberD[4],
    minutes: numberD[5],
    seconds: numberD[6],
  };

  return Object.entries(data).reduce(
    (total, [unit, num]) => total + (num || 0) * unitToMS[unit as keyof typeof data],
    0,
  );
};
