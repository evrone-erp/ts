import { dashIsEmpty } from 'entities/track/common/lib/helpers';
import { TrackCalendarSum } from 'entities/track/common/ui/TrackCalendarSum';
import { memo } from 'react';
import { TTrack } from 'entities/track/common/model/types';
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
