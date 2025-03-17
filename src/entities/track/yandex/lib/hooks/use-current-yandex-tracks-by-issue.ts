import { TTrack } from 'entities/track/common/model/types';
import { useFilterValues } from 'features/filters/lib/useFilterValues';
import { useYandexUser } from 'entities/user/yandex/hooks/use-yandex-user';
import { yandexTrackApi } from 'entities/track/yandex/model/yandex-api';
import { TYandexTrackerConfig } from 'entities/tracker/model/types';

const emptyObject: Record<string, TTrack[]> = {};
const emptyArray: TTrack[] = [];

export const useCurrentYandexTracksByIssue = (issueKey: string, tracker: TYandexTrackerConfig) => {
  const { from, to, userId, utcOffsetInMinutes } = useFilterValues();
  const { uId } = useYandexUser(tracker, userId);

  const { currentData } = yandexTrackApi.useGetYandexTracksQuery(
    { from, to, createdBy: uId, utcOffsetInMinutes, tracker },
    { skip: !uId },
  );

  return {
    date2Tracks: currentData?.issueKey2Tracks[issueKey]?.date2Tracks ?? emptyObject,
    trackList: currentData?.issueKey2Tracks[issueKey]?.list ?? emptyArray,
  };
};
