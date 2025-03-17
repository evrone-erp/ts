import React, { PropsWithChildren, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { EmptyYandexOrganization } from 'entities/organization/ui/EmptyYandexOrganization';
import { CURRENT_ORG_ID_STORAGE_KEY } from 'entities/organization/model/constants';
import { useMainTracker } from 'entities/tracker/lib/useMainTracker';
import { findYandexTrackerByOrgId } from 'entities/tracker/lib/findYandexTrackerByOrgId';
import { selectTrackers } from 'entities/tracker/model/selectors';
import { trackers } from 'entities/tracker/model/reducers';
import { getDefaultTracker } from 'entities/tracker/lib/getDefaultTracker';

export const OrganizationRoute = ({ children }: PropsWithChildren) => {
  const trackersState = useAppSelector(selectTrackers);
  const dispatch = useAppDispatch();

  const mainTracker = useMainTracker();

  useEffect(() => {
    if (mainTracker) {
      return;
    }
    const persistedCurrentOrgId = localStorage.getItem(CURRENT_ORG_ID_STORAGE_KEY);
    if (!persistedCurrentOrgId) {
      return;
    }

    // if user has no main tracker, but there is Org ID in local storage, we can create main tracker from it

    // try to find Yandex Tracker with Org ID from local storage
    const trackerConfigForOrgId = findYandexTrackerByOrgId(trackersState, persistedCurrentOrgId);

    if (trackerConfigForOrgId) {
      // in case there is already a tracker with stored Org ID, just set it as main
      dispatch(trackers.actions.setMainTracker({ id: trackerConfigForOrgId.id }));
    } else {
      // otherwise create a new default tracker and set it as main
      const defaultTracker = getDefaultTracker(persistedCurrentOrgId);
      dispatch(trackers.actions.upsertTracker({ nextTracker: defaultTracker }));
      dispatch(trackers.actions.setMainTracker({ id: defaultTracker.id }));
    }
  }, [trackersState, mainTracker, dispatch]);

  // in case there is no main tracker, render the old EmptyOrganisation component. there user will provide Org ID and
  // main tracker will be created.
  // this is done to preserve the old UX
  if (!mainTracker) {
    return <EmptyYandexOrganization />;
  }

  return <>{children}</>;
};
