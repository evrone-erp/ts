import { useRouter } from 'next/router';
import { useAppSelector } from 'shared/lib/hooks';
import { selectTrackers } from 'entities/tracker/model/selectors';
import { useMemo } from 'react';
import { getTracker } from 'entities/tracker/lib/getTracker';
import { getTrackerIdFromQuery } from 'entities/tracker/lib/getTrackerIdFromQuery';

export const useCurrentPageTracker = () => {
  const router = useRouter();
  const { trackerId } = router.query;

  const trackersState = useAppSelector(selectTrackers);

  const trackerIdStr = useMemo(
    () => (typeof trackerId === 'string' ? getTrackerIdFromQuery(trackerId) : undefined),
    [trackerId],
  );

  if (!trackerIdStr) {
    return undefined;
  }

  return getTracker(trackersState, trackerIdStr);
};
