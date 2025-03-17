import { memo } from 'react';
import { TTrack } from 'entities/track/model/types';
import { TrackInnerRow } from './TrackInnerRow';

interface ITrackInnerProps {
  range: string[];
  tracks: TTrack[] | undefined;
  issueId: string;
  isEdit?: boolean;
}

export const TrackInnerRows = memo(({ range, issueId, tracks, isEdit = false }: ITrackInnerProps) => {
  if (!tracks || !tracks.length) {
    return null;
  }

  return (
    <>
      {tracks.map((track) => (
        <TrackInnerRow range={range} key={track.id} track={track} issueId={issueId} isEdit={isEdit} />
      ))}
    </>
  );
});

TrackInnerRows.displayName = 'TrackInnerRows';
