import { TTrack } from 'entities/track/common/model/types';
import { DurationFormat } from 'features/date/ui/DurationFormat';
import React, { FC } from 'react';
import './style.scss';
import { useISODurationsToTotalDurationData } from 'entities/track/common/lib/hooks/use-iso-dirations-to-total-duration-data';

type TProps = {
  tracksOrTrack: TTrack[] | TTrack;
};

export const TrackCalendarSum: FC<TProps> = ({ tracksOrTrack }) => {
  const durationTotal = useISODurationsToTotalDurationData(tracksOrTrack);

  if (!tracksOrTrack) {
    return null;
  }

  return (
    <div className="TrackCalendarSum">
      <DurationFormat duration={durationTotal} />
    </div>
  );
};
