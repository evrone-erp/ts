import { TrackCalendarColSum } from 'entities/track/common/ui/TrackCalendarColSum';
import { TrackCalendarInnerRow } from 'entities/track/common/ui/TrackCalendarInnerRow';
import { memo } from 'react';
import { TTrack, TTrackInputEditForm } from 'entities/track/common/model/types';
import { TrackColumn } from './TrackColumn';
import styles from './TrackInnerRow.module.scss';
import { TrackNameColumn } from './TrackNameColumn';

interface ITrackInnerRowProps {
  track: TTrack;
  issueId: string;
  range: string[];
  isEdit?: boolean;
  issueUrl: string;
  updateTrack(input: Partial<TTrackInputEditForm>, issueIdOrKey?: string, trackId?: number | string): void;
}

export const TrackInnerRow = memo(
  ({ track, issueId, range, isEdit = false, updateTrack, issueUrl }: ITrackInnerRowProps) => (
    <TrackCalendarInnerRow>
      <TrackNameColumn
        trackId={track.id}
        issueUrl={issueUrl}
        trackComment={track.comment}
        issueId={issueId}
        isEdit={isEdit}
        updateTrack={updateTrack}
        isReadOnlyComment={track.isReadOnlyComment}
      />

      {range.map((date) => (
        <TrackColumn
          key={date.valueOf()}
          date={date}
          track={track}
          issueId={issueId}
          isEdit={isEdit}
          updateTrack={updateTrack}
        />
      ))}

      <TrackCalendarColSum track={track} className={styles.sumCol} />
    </TrackCalendarInnerRow>
  ),
);

TrackInnerRow.displayName = 'TrackInnerRow';
