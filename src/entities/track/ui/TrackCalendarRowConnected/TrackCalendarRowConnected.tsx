import { memo } from 'react';
import { useCurrentTracksByIssue } from 'entities/track/lib/hooks/use-current-tracks-by-issue';
import { TrackCalendarRow, TTrackCalendarRowProps } from 'entities/track/ui/TrackCalendarRow/TrackCalendarRow';

type TProps = Omit<TTrackCalendarRowProps, 'tracks' | 'date2IssueTracks'>;

export const TrackCalendarRowConnected = memo((props: TProps) => {
  const issueKey = props.issue.key;

  const { trackList, date2Tracks } = useCurrentTracksByIssue(issueKey);

  return <TrackCalendarRow tracks={trackList} date2IssueTracks={date2Tracks} {...props} />;
});

TrackCalendarRowConnected.displayName = 'TrackCalendarRowConnected';
