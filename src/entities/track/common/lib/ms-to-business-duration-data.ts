import { TBusinessDurationData } from 'entities/track/common/model/types';
import { MILLISECONDS_A_HOUR, MILLISECONDS_A_MINUTE, MILLISECONDS_A_SECOND } from './constants';

export const msToBusinessDurationData = (ms: number): TBusinessDurationData => {
  const hours = Math.floor(ms / MILLISECONDS_A_HOUR);
  ms %= MILLISECONDS_A_HOUR;
  const minutes = Math.floor(ms / MILLISECONDS_A_MINUTE);
  ms %= MILLISECONDS_A_MINUTE;
  const seconds = Math.floor(ms / MILLISECONDS_A_SECOND);

  return {
    hours,
    minutes,
    seconds,
  };
};
