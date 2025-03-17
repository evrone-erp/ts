import { TrackCalendarColSum } from 'entities/track/ui/TrackCalendarColSum';
import { TrackCalendarInnerRow } from 'entities/track/ui/TrackCalendarInnerRow';
import { memo } from 'react';
import { TTrack } from 'entities/track/model/types';
import { TrackColumn } from './TrackColumn';
import styles from './TrackInnerRow.module.scss';
import { TrackNameColumn } from './TrackNameColumn';

interface ITrackInnerRowProps {
  track: TTrack;
  issueId: string;
  range: string[];
  isEdit?: boolean;
}

export const TrackInnerRow = memo(({ track, issueId, range, isEdit = false }: ITrackInnerRowProps) => (
  <TrackCalendarInnerRow>
    <TrackNameColumn trackId={track.id} trackComment={track.comment} issueId={issueId} isEdit={isEdit} />

    {range.map((date) => (
      <TrackColumn key={date.valueOf()} date={date} track={track} issueId={issueId} isEdit={isEdit} />
    ))}

    <TrackCalendarColSum track={track} className={styles.sumCol} />
  </TrackCalendarInnerRow>
));

TrackInnerRow.displayName = 'TrackInnerRow';
