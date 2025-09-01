import {
  DURATION_DESIGNATORS,
  HOUR_DESIGNATOR_IDX,
  HUMAN_DURATION_STR_REGEX,
  NUMBERS_REGEX,
} from 'entities/track/common/lib/constants';
import { TISODuration } from 'entities/track/common/model/types';

/**
 * transforms human readable duration string
 * @param durationStr
 * @example humanReadableDurationToISO('10w 5d 20h') => 'P10W5DT20H'
 */
export const humanReadableDurationToISO = (durationStr: string | undefined): TISODuration | null => {
  if (!durationStr) {
    return null;
  }
  const trimmed = durationStr.trim();
  if (NUMBERS_REGEX.test(trimmed)) {
    return `PT${trimmed as string & number}M`;
  }

  const match = trimmed.match(HUMAN_DURATION_STR_REGEX);
  if (!match) {
    return null;
  }

  let nominalDuration = '';
  let accurateDuration = '';
  DURATION_DESIGNATORS.forEach((designator, idx) => {
    const number = parseInt(match[idx + 1], 10);
    const resultStr = Number.isNaN(number) ? '' : `${number}${designator}`;

    if (idx < HOUR_DESIGNATOR_IDX) {
      nominalDuration += resultStr;
    } else {
      accurateDuration += resultStr;
    }
  });

  if (nominalDuration === '' && accurateDuration === '') {
    return null;
  }

  if (accurateDuration !== '') {
    accurateDuration = `T${accurateDuration}`;
  }

  return `P${nominalDuration}${accurateDuration}` as TISODuration;
};
