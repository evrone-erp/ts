import { TTrack, TTransformedTracks } from 'entities/track/common/model/types';

const emptyObject: Record<string, TTrack[]> = {};
const emptyArray: TTrack[] = [];

export const useCurrentJiraTracks = (tracks: TTransformedTracks | undefined) => ({
  date2Tracks: tracks?.date2Tracks ?? emptyObject,
  trackList: tracks?.list ?? emptyArray,
});
