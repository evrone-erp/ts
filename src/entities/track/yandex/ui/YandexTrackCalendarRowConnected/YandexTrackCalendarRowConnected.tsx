import { memo } from 'react';
import { useCurrentYandexTracksByIssue } from 'entities/track/yandex/lib/hooks/use-current-yandex-tracks-by-issue';
import { TrackCalendarRow, TTrackCalendarRowProps } from 'entities/track/common/ui/TrackCalendarRow/TrackCalendarRow';
import { TYandexTrackerConfig } from 'entities/tracker/model/types';

type TProps = Omit<TTrackCalendarRowProps, 'tracks' | 'date2IssueTracks'> & {
  tracker: TYandexTrackerConfig;
};

export const YandexTrackCalendarRowConnected = memo((props: TProps) => {
  const { tracker, issue } = props;
  const issueKey = issue.key;

  const { trackList, date2Tracks } = useCurrentYandexTracksByIssue(issueKey, tracker);

  return <TrackCalendarRow tracks={trackList} date2IssueTracks={date2Tracks} {...props} />;
});

YandexTrackCalendarRowConnected.displayName = 'YandexTrackCalendarRowConnected';
