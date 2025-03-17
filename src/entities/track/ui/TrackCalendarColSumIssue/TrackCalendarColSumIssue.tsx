import { dashIsEmpty } from 'entities/track/lib/helpers';
import { TrackCalendarSum } from 'entities/track/ui/TrackCalendarSum';
import { memo } from 'react';
import { TTrack } from 'entities/track/model/types';
import styles from './TrackCalendarColSumIssue.module.scss';

interface ITrackCalendarColSumIssueProps {
  tracks: TTrack[] | undefined;
}

export const TrackCalendarColSumIssue = memo(({ tracks = [] }: ITrackCalendarColSumIssueProps) => (
  <th className={styles.col}>
    <div>{dashIsEmpty(tracks, <TrackCalendarSum tracksOrTrack={tracks} />)}</div>
  </th>
));

TrackCalendarColSumIssue.displayName = 'TrackCalendarColSumIssue';
