import type { FC } from 'react';
import React from 'react';
import type { TBusinessDurationData } from 'entities/track/common/model/types';
import { useFormatDuration } from 'entities/track/common/lib/hooks/use-format-duration';

type TProps = {
  duration: TBusinessDurationData;
};

export const DurationFormat: FC<TProps> = ({ duration }: TProps) => {
  const durationFormat = useFormatDuration(duration);
  return <>{durationFormat}</>;
};
