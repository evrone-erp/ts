import { ReactNode } from 'react';
import { validateHumanReadableDuration } from 'entities/track/common/lib/validate-human-readable-duration';
import { DateWrapper, TDate } from 'features/date/lib/DateWrapper';

export const durationValidationRules = [
  {
    type: 'string' as const,
    validator: (_: unknown, val: string) => (validateHumanReadableDuration(val) ? Promise.resolve() : Promise.reject()),
  },
];

export function dashIsEmpty(elementsOrElement: Array<unknown> | unknown, el: ReactNode) {
  const dash = <>—</>;

  if (Array.isArray(elementsOrElement)) {
    return elementsOrElement.length > 0 ? el : dash;
  }

  return elementsOrElement ? el : dash;
}

/**
 * we index tracks, according to the date, when they start. this function takes date and formats them so that it could
 * be used to access tracks stored in redux, i.e. it returns "start of the day time" string
 */
export const formatDateAsTrackKey = (date: TDate) => date.startOf('day').format();

/**
 * takes track and returns the string, which will be used to store or access track
 */
export const getTrackDateCacheKey = <T extends { start: string }>(track: T, utcOffsetInMinutes: number | undefined) =>
  DateWrapper.getDate({ date: track.start, utcOffsetInMinutes }).startOf('day').format();
