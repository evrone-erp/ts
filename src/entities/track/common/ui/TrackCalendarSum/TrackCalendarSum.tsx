import type { TTrack } from 'entities/track/common/model/types';
import { DurationFormat } from 'features/date/ui/DurationFormat';
import type { FC } from 'react';
import styles from './TrackCalendarSum.module.scss';
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
    <div className={styles.TrackCalendarSum}>
      <DurationFormat duration={durationTotal} />
    </div>
  );
};
