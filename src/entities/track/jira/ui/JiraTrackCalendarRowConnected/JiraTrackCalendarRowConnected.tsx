import { memo } from 'react';
import { TrackCalendarRow, TTrackCalendarRowProps } from 'entities/track/common/ui/TrackCalendarRow/TrackCalendarRow';
import { useCurrentJiraTracksByIssue } from 'entities/track/jira/lib/hooks/use-current-jira-tracks-by-issue';
import { TTransformedTracks } from 'entities/track/common/model/types';

type TProps = Omit<TTrackCalendarRowProps, 'tracks' | 'date2IssueTracks'> & {
  tracks: TTransformedTracks | undefined;
};

export const JiraTrackCalendarRowConnected = memo((props: TProps) => {
  const { issue, tracks } = props;
  const issueKey = issue.key;

  const { trackList, date2Tracks } = useCurrentJiraTracksByIssue(issueKey, tracks);

  if (!tracks) {
    return null;
  }

  return <TrackCalendarRow date2IssueTracks={date2Tracks} {...props} tracks={trackList} />;
});

JiraTrackCalendarRowConnected.displayName = 'YandexTrackCalendarRowConnected';
