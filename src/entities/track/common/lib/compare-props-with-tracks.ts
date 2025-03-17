import { TTrack } from 'entities/track/common/model/types';
import { shallowEqual } from 'react-redux';

type TPropsWithTracks = {
  tracks: TTrack[] | undefined;
};

export const comparePropsWithTracks = <TProps extends TPropsWithTracks>(prevProps: TProps, nextProps: TProps) => {
  const { tracks: tracksPrev, ...restPrevProps } = prevProps;
  const { tracks: tracksNext, ...restNextProps } = nextProps;

  const areRestPropsEqual = shallowEqual(restPrevProps, restNextProps);

  if (!areRestPropsEqual) {
    // if other props are not equal, no point comparing further
    return false;
  }

  const areTracksShallowEqual = shallowEqual(tracksPrev, tracksNext);

  if (areRestPropsEqual && areTracksShallowEqual) {
    // best case if everything is equal, then exit
    return true;
  }

  return shallowEqual(tracksPrev, tracksNext);
};
