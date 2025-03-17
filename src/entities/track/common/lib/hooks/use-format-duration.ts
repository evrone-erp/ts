import { TBusinessDurationData } from 'entities/track/common/model/types';
import { useMessage } from 'entities/locale/lib/hooks';
import { useMemo } from 'react';

export const useFormatDuration = (durationData: TBusinessDurationData | undefined) => {
  const message = useMessage();

  return useMemo(() => {
    if (!durationData) {
      return '';
    }

    return Object.entries(durationData)
      .reduce((acc, [key, value]) => {
        if (value > 0) {
          acc.push(message(`date.${key}.short`, { value }));
        }

        return acc;
      }, [] as string[])
      .join(' ');
  }, [durationData, message]);
};
