import { useAppSelector } from 'shared/lib/hooks';
import { selectTrackers } from 'entities/tracker/model/selectors';
import { getDefaultTracker } from 'entities/tracker/lib/getDefaultTracker';
import { useMemo } from 'react';
import { TTrackerConfig } from 'entities/tracker/model/types';

/**
 * returns true if user has created additional trackers after the default one was created
 */
export const useUserHasCreatedTrackers = () => {
  const { ids, trackers } = useAppSelector(selectTrackers);
  const defaultTracker = useMemo(() => getDefaultTracker(''), []);

  const hasMoreThanOneTracker = ids.length > 1;

  const [tracker] = useMemo(() => Object.values(trackers), [trackers]) as [TTrackerConfig | undefined];

  // in case user only has 1 tracker, check that it's not the same as default
  const onlyTrackerIsNotDefault =
    tracker?.id !== defaultTracker.id ||
    tracker?.type !== defaultTracker.type ||
    tracker?.isCloud !== defaultTracker.isCloud;

  return hasMoreThanOneTracker || onlyTrackerIsNotDefault;
};
