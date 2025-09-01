import { memo } from 'react';
import { TrackCalendarSum } from 'entities/track/common/ui/TrackCalendarSum';
import { dashIsEmpty } from 'entities/track/common/lib/helpers';
import { TTrack } from 'entities/track/common/model/types';
import styles from './TrackCalendarFootColSum.module.scss';

interface ITrackCalendarFootColSumProps {
  tracks: TTrack[];
}

export const TrackCalendarFootColSum = memo(({ tracks = [] }: ITrackCalendarFootColSumProps) => (
  <th className={styles.col} aria-label="total sum">
    {dashIsEmpty(tracks, <TrackCalendarSum tracksOrTrack={tracks} />)}
  </th>
));

TrackCalendarFootColSum.displayName = 'TrackCalendarFootColSum';
