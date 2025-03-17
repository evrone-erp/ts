import React, { FC } from 'react';
import { TBusinessDurationData } from 'entities/track/model/types';
import { useFormatDuration } from 'entities/track/lib/hooks/use-format-duration';

type TProps = {
  duration: TBusinessDurationData;
};

export const DurationFormat: FC<TProps> = ({ duration }: TProps) => {
  const durationFormat = useFormatDuration(duration);
  return <>{durationFormat}</>;
};
