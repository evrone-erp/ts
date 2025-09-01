import { useFilterValues } from 'features/filters/lib/useFilterValues';
import { yandexTrackApi } from 'entities/track/yandex/model/yandex-api';
import { useYandexUser } from 'entities/user/yandex/hooks/use-yandex-user';
import { TTrack } from 'entities/track/common/model/types';
import { TYandexTrackerConfig } from 'entities/tracker/model/types';

const emptyObject: Record<string, TTrack[]> = {};
const emptyArray: TTrack[] = [];

export const useCurrentYandexTracks = (tracker: TYandexTrackerConfig) => {
  const { from, to, userId, utcOffsetInMinutes } = useFilterValues();
  const { uId } = useYandexUser(tracker, userId);

  const { currentData } = yandexTrackApi.useGetYandexTracksQuery(
    { from, to, createdBy: uId, utcOffsetInMinutes, tracker },
    { skip: !uId },
  );

  return { date2Tracks: currentData?.date2Tracks ?? emptyObject, trackList: currentData?.list ?? emptyArray };
};
