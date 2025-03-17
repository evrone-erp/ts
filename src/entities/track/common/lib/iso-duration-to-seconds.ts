import { isoDurationToBusinessMs } from 'entities/track/common/lib/iso-duration-to-business-ms';
import { TISODuration } from 'entities/track/common/model/types';

export const isoDurationToSeconds = (duration: TISODuration | undefined) => {
  if (!duration) {
    return undefined;
  }

  const ms = isoDurationToBusinessMs(duration);

  if (!ms) {
    return undefined;
  }

  return Math.floor(ms / 1000);
};
