import { useMemo } from 'react';
import { TBusinessDurationData, TISODuration } from 'entities/track/common/model/types';
import { isoDurationToBusinessMs } from 'entities/track/common/lib/iso-duration-to-business-ms';
import { msToBusinessDurationData } from 'entities/track/common/lib/ms-to-business-duration-data';

type TDurationItem = {
  duration: TISODuration;
};

export type TAllowedArgs = Array<TDurationItem | TISODuration> | TDurationItem | TISODuration;

const isISODuration = (x: TAllowedArgs): x is TISODuration => typeof x === 'string';

const useFormatInput = (durations: TAllowedArgs): TISODuration[] =>
  useMemo(() => {
    if (Array.isArray(durations)) {
      return durations.map((d) => (isISODuration(d) ? d : d.duration));
    }
    if (isISODuration(durations)) {
      return [durations];
    }
    return [durations.duration];
  }, [durations]);

/**
 * takes durations and calculates sum, using business hours and weeks and returns it as TBusinessDurationData struct
 * @param durations
 * @example useISODurationsToTotalDurationData('P1WT2H') => {hours: 42, minutes: 0, seconds: 0}
 * @example useISODurationsToTotalDurationData(['P1WT2H', PT10H10M]) => {hours: 52, minutes: 10, seconds: 0}
 * @example useISODurationsToTotalDurationData([{duration: 'P1W'}, {duration: 'P5DT30M20S'}]) => {hours: 80, minutes: 30, seconds: 20}
 * @example useISODurationsToTotalDurationData(['P3WT1H40M', {duration: 'P5DT30M20S'}]) => {hours: 162, minutes: 10, seconds: 20}
 */
export const useISODurationsToTotalDurationData = (durations: TAllowedArgs): TBusinessDurationData => {
  const isoDurationList = useFormatInput(durations);

  return useMemo(() => {
    let totalMs = 0;
    for (const duration of isoDurationList) {
      totalMs += isoDurationToBusinessMs(duration) ?? 0;
    }

    return msToBusinessDurationData(totalMs);
  }, [isoDurationList]);
};
