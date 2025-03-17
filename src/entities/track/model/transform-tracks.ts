import {
  TGetTracksParams,
  TTrack,
  TTransformedTracks,
  TTransformedTracksByDateRange,
} from 'entities/track/model/types';
import { getTrackDateCacheKey } from 'entities/track/lib/helpers';
import { DateWrapper } from 'features/date/lib/DateWrapper';

const filterTracksByStartDate = (
  from: string,
  to: string,
  utcOffsetInMinutes: number | undefined,
  tracks: TTrack[],
) => {
  const fromObj = DateWrapper.getDate({ date: from, utcOffsetInMinutes });
  const toObj = DateWrapper.getDate({ date: to, utcOffsetInMinutes });

  return tracks.filter((tr) =>
    DateWrapper.getDate({ date: tr.start, utcOffsetInMinutes }).isBetween(fromObj, toObj, undefined, '[]'),
  );
};

const filterTracksByIssue = (issueKey: string, tracks: TTrack[]): TTrack[] =>
  tracks.filter(({ issue }) => issue.key === issueKey);

const populateLocalStartDay2TrackMap = (date: string, track: TTrack, date2Track: TTransformedTracks['date2Tracks']) => {
  if (date2Track[date]) {
    date2Track[date].push(track);
  } else {
    date2Track[date] = [track];
  }
};

const populateIssueKey2TracksMap = (
  date: string,
  issueKey: string,
  track: TTrack,
  issueKey2Tracks: Record<string, TTransformedTracksByDateRange>,
) => {
  if (!issueKey2Tracks[issueKey]) {
    issueKey2Tracks[issueKey] = {
      date2Tracks: { [date]: [track] },
      list: [track],
    };
    return;
  }

  const trackStruct = issueKey2Tracks[issueKey];
  trackStruct?.list.push(track);

  if (!trackStruct?.date2Tracks[date]) {
    trackStruct.date2Tracks[date] = [track];
    return;
  }

  trackStruct?.date2Tracks[date]?.push(track);
};

export const transformTracks = (
  { issueKey, from, to, utcOffsetInMinutes }: TGetTracksParams,
  responseTracks: TTrack[] | undefined = [],
): TTransformedTracks => {
  const date2Tracks: TTransformedTracks['date2Tracks'] = {};
  // use set to avoid duplicates
  const issueKeySet = new Set<string>();
  const issueKey2Tracks: Record<string, TTransformedTracksByDateRange> = {};

  // when calling transformTracks, after performing mutation, we might have to check that tracks are in date range
  const tracksForPeriod = filterTracksByStartDate(from, to, utcOffsetInMinutes, responseTracks);

  // Yandex Tracker doesn't have API to search for issue's tracks for a certain date, so the next best thing is to
  // fetch all tracks for a date and then filter them by issue key...
  const tracks = issueKey ? filterTracksByIssue(issueKey, tracksForPeriod) : tracksForPeriod;

  for (const track of tracks) {
    const localTrackStartDay = getTrackDateCacheKey(track, utcOffsetInMinutes);
    const trackIssueKey = track.issue.key;
    issueKeySet.add(trackIssueKey);

    populateLocalStartDay2TrackMap(localTrackStartDay, track, date2Tracks);
    populateIssueKey2TracksMap(localTrackStartDay, trackIssueKey, track, issueKey2Tracks);
  }

  return {
    list: tracks ?? [],
    issueKeyList: Array.from(issueKeySet.values()),
    date2Tracks,
    issueKey2Tracks,
  };
};
