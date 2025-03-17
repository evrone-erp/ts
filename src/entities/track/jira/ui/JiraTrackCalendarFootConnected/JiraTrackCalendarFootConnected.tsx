import {
  ITrackCalendarFootProps,
  TrackCalendarFoot,
} from 'entities/track/common/ui/TrackCalendarFoot/TrackCalendarFoot';
import { TTransformedTracks } from 'entities/track/common/model/types';
import { useCurrentJiraTracks } from 'entities/track/jira/lib/hooks/use-current-jira-tracks';

type TProps = Omit<ITrackCalendarFootProps, 'trackList' | 'date2Tracks'> & {
  tracks: TTransformedTracks | undefined;
};

export const JiraTrackCalendarFootConnected = (props: TProps) => {
  const { tracks } = props;

  const { date2Tracks, trackList } = useCurrentJiraTracks(tracks);

  return <TrackCalendarFoot {...props} date2Tracks={date2Tracks} trackList={trackList} />;
};
