import { TTrack } from 'entities/track/model/types';
import { useFilterValues } from 'features/filters/lib/useFilterValues';
import { useUser } from 'entities/user/hooks/use-user';
import { trackApi } from 'entities/track/model/api';

const emptyObject: Record<string, TTrack[]> = {};
const emptyArray: TTrack[] = [];
export const useCurrentTracksByIssue = (issueKey: string) => {
  const { from, to, userId, utcOffsetInMinutes } = useFilterValues();
  const { uId } = useUser(userId);

  const { currentData } = trackApi.useGetTracksQuery({ from, to, createdBy: uId, utcOffsetInMinutes }, { skip: !uId });

  return {
    date2Tracks: currentData?.issueKey2Tracks[issueKey]?.date2Tracks ?? emptyObject,
    trackList: currentData?.issueKey2Tracks[issueKey]?.list ?? emptyArray,
  };
};
