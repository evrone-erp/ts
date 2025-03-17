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
  isEditTrackComment?: boolean;
  trackCommentEditDisabledReason?: string;
  updateTrack(input: Partial<TTrackInputEditForm>, issueIdOrKey?: string, trackId?: number | string): void;
}

export const TrackInnerRow = memo(
  ({
    track,
    issueId,
    range,
    isEdit = false,
    updateTrack,
    isEditTrackComment = isEdit,
    trackCommentEditDisabledReason,
  }: ITrackInnerRowProps) => (
    <TrackCalendarInnerRow>
      <TrackNameColumn
        trackId={track.id}
        trackComment={track.comment}
        issueId={issueId}
        isEdit={isEdit}
        isEditTrackComment={isEditTrackComment}
        updateTrack={updateTrack}
        trackCommentEditDisabledReason={trackCommentEditDisabledReason}
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
