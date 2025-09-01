import { useCurrentYandexTracks } from 'entities/track/yandex/lib/hooks/use-current-yandex-tracks';
import {
  ITrackCalendarFootProps,
  TrackCalendarFoot,
} from 'entities/track/common/ui/TrackCalendarFoot/TrackCalendarFoot';
import { TYandexTrackerConfig } from 'entities/tracker/model/types';

type TProps = Omit<ITrackCalendarFootProps, 'trackList' | 'date2Tracks'> & {
  tracker: TYandexTrackerConfig;
};

export const YandexTrackCalendarFootConnected = (props: TProps) => {
  const { tracker } = props;
  const { date2Tracks, trackList } = useCurrentYandexTracks(tracker);

  return <TrackCalendarFoot {...props} date2Tracks={date2Tracks} trackList={trackList} />;
};
