import { shallowEqual } from 'react-redux';
import { TTrack } from 'entities/track/common/model/types';

type TProps = {
  date2IssueTracks: Record<string, TTrack[]>;
  tracks?: TTrack[] | undefined;
};

export const compareTrackCalendarRowProps = <T extends TProps>(prevProps: T, nextProps: T) => {
  const { tracks: tracksPrev, date2IssueTracks: date2IssueTracksPrev, ...restPrevProps } = prevProps;
  const { tracks: tracksNext, date2IssueTracks: date2IssueTracksNext, ...restNextProps } = nextProps;

  const areRestPropsEqual = shallowEqual(restPrevProps, restNextProps);

  if (!areRestPropsEqual) {
    // if some other props are not equal, exit
    return false;
  }

  const areTracksEqual = shallowEqual(tracksPrev, tracksNext);
  const areMapsEqual = Object.is(date2IssueTracksPrev, date2IssueTracksNext);

  const arePropsShallowEqual = areRestPropsEqual && areTracksEqual && areMapsEqual;

  if (arePropsShallowEqual) {
    // if we pass shallow equality, it's the best case
    return true;
  }

  if (!areTracksEqual) {
    // if tracks aren't equal, there's no point comparing maps
    return false;
  }

  const prevEntries = Object.entries(date2IssueTracksPrev);
  const nextEntries = Object.entries(date2IssueTracksNext);

  if (prevEntries.length !== nextEntries.length) {
    return false;
  }

  for (const [prevKey, prevVal] of prevEntries) {
    if (!Object.hasOwn(date2IssueTracksNext, prevKey) || !shallowEqual(prevVal, date2IssueTracksNext[prevKey])) {
      return false;
    }
  }

  return true;
};
