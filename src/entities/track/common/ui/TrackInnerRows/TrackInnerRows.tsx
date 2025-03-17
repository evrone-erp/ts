import { memo } from 'react';
import { TTrack, TTrackInputEditForm } from 'entities/track/common/model/types';
import { TrackInnerRow } from './TrackInnerRow';

interface ITrackInnerProps {
  range: string[];
  tracks: TTrack[] | undefined;
  issueId: string;
  isEdit?: boolean;
  isEditTrackComment?: boolean;
  trackCommentEditDisabledReason?: string;
  updateTrack(input: Partial<TTrackInputEditForm>, issueIdOrKey?: string, trackId?: number | string): void;
}

export const TrackInnerRows = memo(
  ({
    range,
    issueId,
    tracks,
    isEdit = false,
    isEditTrackComment = isEdit,
    updateTrack,
    trackCommentEditDisabledReason,
  }: ITrackInnerProps) => {
    if (!tracks || !tracks.length) {
      return null;
    }

    return (
      <>
        {tracks.map((track) => (
          <TrackInnerRow
            range={range}
            key={track.id}
            track={track}
            issueId={issueId}
            isEdit={isEdit}
            isEditTrackComment={isEditTrackComment}
            trackCommentEditDisabledReason={trackCommentEditDisabledReason}
            updateTrack={updateTrack}
          />
        ))}
      </>
    );
  },
);

TrackInnerRows.displayName = 'TrackInnerRows';
