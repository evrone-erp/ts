import { memo } from 'react';
import { TTrack, TTrackInputEditForm } from 'entities/track/common/model/types';
import { TrackInnerRow } from './TrackInnerRow';

interface ITrackInnerProps {
  range: string[];
  tracks: TTrack[] | undefined;
  issueId: string;
  isEdit?: boolean;
  issueUrl: string;
  updateTrack(input: Partial<TTrackInputEditForm>, issueIdOrKey?: string, trackId?: number | string): void;
}

export const TrackInnerRows = memo(
  ({ range, issueId, tracks, isEdit = false, updateTrack, issueUrl }: ITrackInnerProps) => {
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
            updateTrack={updateTrack}
            issueUrl={issueUrl}
          />
        ))}
      </>
    );
  },
);

TrackInnerRows.displayName = 'TrackInnerRows';
