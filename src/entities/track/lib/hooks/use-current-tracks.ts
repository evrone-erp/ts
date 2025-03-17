import { useFilterValues } from 'features/filters/lib/useFilterValues';
import { trackApi } from 'entities/track/model/api';
import { useUser } from 'entities/user/hooks/use-user';
import { TTrack } from 'entities/track/model/types';

const emptyObject: Record<string, TTrack[]> = {};
const emptyArray: TTrack[] = [];

export const useCurrentTracks = () => {
  const { from, to, userId, utcOffsetInMinutes } = useFilterValues();
  const { uId } = useUser(userId);

  const { currentData } = trackApi.useGetTracksQuery({ from, to, createdBy: uId, utcOffsetInMinutes }, { skip: !uId });

  return { date2Tracks: currentData?.date2Tracks ?? emptyObject, trackList: currentData?.list ?? emptyArray };
};
