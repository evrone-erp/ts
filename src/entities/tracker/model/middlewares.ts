import { trackers } from 'entities/tracker/model/reducers';
import { selectTrackers } from 'entities/tracker/model/selectors';
import { TRACKERS_STORAGE_KEY } from 'entities/tracker/model/constants';
import { Middleware } from '@reduxjs/toolkit';
import { isYandexTrackerCfg, TTrackerStore } from 'entities/tracker/model/types';

/**
 * removes auth tokens before saving to local storage
 */
const prepareTrackersForStorage = (trackersState: TTrackerStore) => {
  const trackersCopy: TTrackerStore = JSON.parse(JSON.stringify(trackersState));

  trackersCopy.ids.forEach((id) => {
    // jira auth tokens expire in 1 hour and each time user authenticates in jira they have to go through entire
    // authentication process. we save jira auth token in local storage in order to not force users to
    // authenticate on every page refresh.
    // We only delete yandex tracker tokens
    if (isYandexTrackerCfg(trackersCopy.trackers[id])) {
      delete trackersCopy.trackers[id].authToken;
    }
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
    trackers.actions.setYandexAuthToken.match(action) ||
    trackers.actions.logoutTracker.match(action) ||
    trackers.actions.setJiraTokenAndCloudIdByUrls.match(action) ||
    trackers.actions.setUsernameJiraState.match(action) ||
    trackers.actions.setJiraTokens.match(action)
  ) {
    const trackersState = selectTrackers(store.getState());

    localStorage.setItem(TRACKERS_STORAGE_KEY, JSON.stringify(prepareTrackersForStorage(trackersState)));
  }
  return result;
};
