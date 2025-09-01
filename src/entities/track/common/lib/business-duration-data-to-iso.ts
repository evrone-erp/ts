import { TBusinessDurationData, TISODuration } from 'entities/track/common/model/types';

const dataToSymbolMap = new Map<keyof TBusinessDurationData, 'H' | 'M' | 'S'>([
  ['hours', 'H'],
  ['minutes', 'M'],
  ['seconds', 'S'],
]);

export const businessDurationDataToIso = (durationData: TBusinessDurationData | undefined): TISODuration => {
  if (!durationData) {
    return 'PT0H';
  }

  return Object.entries(durationData).reduce(
    (acc, [key, value]) => `${acc}${value}${dataToSymbolMap.get(key as keyof TBusinessDurationData)}`,
    'PT' as string,
  ) as TISODuration;
};
