import { trackers } from 'entities/tracker/model/reducers';
import { selectTrackers } from 'entities/tracker/model/selectors';
import { TRACKERS_STORAGE_KEY } from 'entities/tracker/model/constants';
import { Middleware } from '@reduxjs/toolkit';
import { TTrackerStore } from 'entities/tracker/model/types';

/**
 * removes auth tokens before saving to local storage
 */
const prepareTrackersForStorage = (trackersState: TTrackerStore) => {
  const trackersCopy: TTrackerStore = JSON.parse(JSON.stringify(trackersState));

  trackersCopy.ids.forEach((id) => {
    delete trackersCopy.trackers[id].authToken;
  });

  return trackersCopy;
};

export const trackersMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  if (
    trackers.actions.upsertTracker.match(action) ||
    trackers.actions.deleteTracker.match(action) ||
    trackers.actions.setMainTracker.match(action) ||
    trackers.actions.resetMainTracker.match(action) ||
    trackers.actions.setUsername.match(action) ||
    // we need to save it on this action because it also sets lastLogin time
    trackers.actions.setAuthToken.match(action) ||
    trackers.actions.logoutTracker.match(action)
  ) {
    const trackersState = selectTrackers(store.getState());

    localStorage.setItem(TRACKERS_STORAGE_KEY, JSON.stringify(prepareTrackersForStorage(trackersState)));
  }
  return result;
};
