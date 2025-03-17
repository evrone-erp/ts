import { useAppSelector } from 'shared/lib/hooks';
import { selectTrackers } from 'entities/tracker/model/selectors';
import { getTracker } from 'entities/tracker/lib/getTracker';

export const useMainTracker = () => {
  const trackersState = useAppSelector(selectTrackers);

  if (!trackersState.mainTrackerId) {
    return undefined;
  }

  return getTracker(trackersState, trackersState.mainTrackerId);
};
