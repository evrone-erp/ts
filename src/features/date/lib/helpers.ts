import { UTC_OFFSET_TO_TIMEZONE_MAP } from 'features/date/lib/constants';

export const getTimeOffsetLabelByOffset = (offset: number | undefined) => {
  if (offset === undefined) {
    return undefined;
  }

  const tz = UTC_OFFSET_TO_TIMEZONE_MAP.get(offset);

  return tz ? `GMT${tz.rawFormat.split(' ')[0]}` : undefined;
};
