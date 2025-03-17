import { TTrack, TTransformedTracks } from 'entities/track/common/model/types';

const emptyObject: Record<string, TTrack[]> = {};
const emptyArray: TTrack[] = [];

export const useCurrentJiraTracksByIssue = (issueKey: string, tracks: TTransformedTracks | undefined) => ({
  date2Tracks: tracks?.issueKey2Tracks[issueKey]?.date2Tracks ?? emptyObject,
  trackList: tracks?.issueKey2Tracks[issueKey]?.list ?? emptyArray,
});
