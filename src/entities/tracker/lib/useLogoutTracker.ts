import { TTrackerConfig } from 'entities/tracker/model/types';
import { useAppDispatch } from 'shared/lib/hooks';
import { useCallback } from 'react';
import { trackers } from 'entities/tracker/model/reducers';
import { useUserHasCreatedTrackers } from 'entities/tracker/lib/useUserHasCreatedTrackers';
import { CURRENT_ORG_ID_STORAGE_KEY } from 'entities/organization/model/constants';

export const useLogoutTracker = (tracker: TTrackerConfig) => {
  const hasCreatedTrackers = useUserHasCreatedTrackers();
  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    dispatch(trackers.actions.logoutTracker(tracker));

    if (!hasCreatedTrackers) {
      dispatch(trackers.actions.resetMainTracker());
      localStorage.removeItem(CURRENT_ORG_ID_STORAGE_KEY);
    }

    window.location.reload();
  }, [dispatch, tracker, hasCreatedTrackers]);

  return logout;
};
