import { TISODuration } from 'entities/track/common/model/types';
import { useFormatDuration } from 'entities/track/common/lib/hooks/use-format-duration';
import { useISODurationsToTotalDurationData } from 'entities/track/common/lib/hooks/use-iso-dirations-to-total-duration-data';

export const useISOToHumanReadableDuration = (duration: TISODuration): string => {
  const durationData = useISODurationsToTotalDurationData(duration);

  return useFormatDuration(durationData);
};
