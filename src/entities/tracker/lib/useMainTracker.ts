import { useAppSelector } from 'shared/lib/hooks';
import { selectTrackers } from 'entities/tracker/model/selectors';
import { getTracker } from 'entities/tracker/lib/getTracker';
import { TAppConfig } from 'shared/lib/types';

export const useMainTracker = (props: TAppConfig) => {
  const trackersState = useAppSelector(selectTrackers);

  if (!trackersState.mainTrackerId) {
    return undefined;
  }

  const tracker = getTracker(trackersState, trackersState.mainTrackerId);

  if (
    !tracker ||
    (tracker.type === 'yandex' && !props.isYandexTrackerEnabled) ||
    (tracker.type === 'jira' && !props.isJiraEnabled)
  ) {
    return undefined;
  }

  return tracker;
};
