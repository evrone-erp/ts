import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  isJiraTrackerCfg,
  isYandexTrackerCfg,
  TSetJiraTokenAndCloudIdByUrlsPayload,
  TSetJiraTrackerTokens,
  TSetMainTrackerPayload,
  TSetUsernamePayload,
  TSetUsernameState,
  TSetYandexAuthTokenPayload,
  TTrackerConfig,
  TTrackerStore,
  TUpsertTrackerPayload,
} from 'entities/tracker/model/types';

const initialState: TTrackerStore = {
  trackers: {},
  ids: [],
  mainTrackerId: null,
  userName2State: {},
};

export const trackers = createSlice({
  initialState,
  name: 'trackersConfig',
  reducers: {
    upsertTracker(state, { payload: { nextTracker, prevTracker } }: PayloadAction<TUpsertTrackerPayload>) {
      if (prevTracker) {
        const trackerIdx = state.ids.indexOf(prevTracker.id);

        state.ids[trackerIdx] = nextTracker.id;

        const prevTrackerState = { ...state.trackers[prevTracker.id] };
        delete state.trackers[prevTracker.id];

        state.trackers[nextTracker.id] = {
          ...prevTrackerState,
          ...nextTracker,
        };
      } else {
        if (!state.trackers[nextTracker.id]) {
          state.ids.push(nextTracker.id);
        }

        state.trackers[nextTracker.id] = nextTracker;
      }

      if (!state.mainTrackerId || state.mainTrackerId === prevTracker?.id) {
        state.mainTrackerId = nextTracker.id;
      }
    },
    deleteTracker(state, { payload: tracker }: PayloadAction<TTrackerConfig>) {
      state.ids = state.ids.filter((id) => id !== tracker.id);
      delete state.trackers[tracker.id];
    },
    setMainTracker(state, { payload: { id } }: PayloadAction<TSetMainTrackerPayload>) {
      state.mainTrackerId = id;
    },
    resetMainTracker(state) {
      state.mainTrackerId = null;
    },
    setUsername(state, { payload: { id, username } }: PayloadAction<TSetUsernamePayload>) {
      if (!state.trackers[id]) {
        return;
      }

      state.trackers[id].username = username;
    },
    setYandexAuthToken(state, { payload: { id, token, lastLogin } }: PayloadAction<TSetYandexAuthTokenPayload>) {
      const trackerId = id ?? state.mainTrackerId;

      if (!trackerId) {
        return;
      }

      const tracker = state.trackers[trackerId];

      if (!isYandexTrackerCfg(tracker)) {
        return;
      }

      // we need to remove lastLogin from other trackers so that user would get redirected to auth page as soon as they
      // open another tracker, without seeing 403 error page
      state.ids.forEach((tId) => {
        const currentTracker = state.trackers[tId];
        if (isYandexTrackerCfg(currentTracker)) {
          delete currentTracker.lastLogin;
        }
      });

      // set token and last login to the tracker
      tracker.authToken = token;
      tracker.lastLogin = lastLogin;
      const { username } = tracker;

      // we can also set the same token for every tracker with the same username, because it's the same account
      if (username)
        state.ids.forEach((tId) => {
          const currentTracker = state.trackers[tId];
          if (isYandexTrackerCfg(currentTracker) && currentTracker.username === username) {
            currentTracker.authToken = token;
            currentTracker.lastLogin = lastLogin;
          }
        });
    },
    setJiraTokenAndCloudIdByUrls(
      state,
      {
        payload: { token, refreshToken, tokenExpiryTimestamp, refreshTokenExpiryTimestamp, urls, url2CloudId },
      }: PayloadAction<TSetJiraTokenAndCloudIdByUrlsPayload>,
    ) {
      state.ids.forEach((tId) => {
        const tracker = state.trackers[tId];
        if (!isJiraTrackerCfg(tracker)) {
          return;
        }

        // normalize url
        const url = new URL(tracker.url).href;
        if (urls.includes(url)) {
          tracker.authToken = token;
          if (isJiraTrackerCfg(tracker)) {
            tracker.refreshToken = refreshToken;
            tracker.tokenExpiryTimestamp = tokenExpiryTimestamp;
            tracker.refreshTokenExpiryTimestamp = refreshTokenExpiryTimestamp;
            tracker.cloudId = url2CloudId[url];
          }
        }
      });
    },
    logoutTracker(state, { payload: tracker }: PayloadAction<TTrackerConfig>) {
      const stateTracker = state.trackers[tracker.id];
      if (!stateTracker) {
        return;
      }

      state.ids.forEach((tId) => {
        const currentTracker = state.trackers[tId];
        // only log out trackers of the same type
        if (stateTracker.type !== currentTracker.type) {
          return;
        }
        if (isYandexTrackerCfg(currentTracker)) {
          delete currentTracker.lastLogin;
        } else if (isJiraTrackerCfg(currentTracker)) {
          delete currentTracker.authToken;
          delete currentTracker.refreshToken;
          delete currentTracker.tokenExpiryTimestamp;
          delete currentTracker.refreshTokenExpiryTimestamp;
        }
      });
    },
    setUsernameJiraState(state, { payload: { username, jiraState } }: PayloadAction<TSetUsernameState>) {
      state.userName2State[username] = jiraState;
    },
    setJiraTokens(
      state,
      { payload: { token, trackerId, refreshToken, tokenExpiryTimestamp } }: PayloadAction<TSetJiraTrackerTokens>,
    ) {
      const tracker = state.trackers[trackerId];

      if (!isJiraTrackerCfg(tracker)) {
        return;
      }

      const { username } = tracker;

      // we need to remove tokens from other trackers so that user would get redirected to auth page as soon as they
      // open another tracker, without seeing 403 error page
      state.ids.forEach((tId) => {
        const currentTracker = state.trackers[tId];
        if (!isJiraTrackerCfg(currentTracker)) {
          return;
        }
        delete currentTracker.authToken;
        delete currentTracker.refreshToken;
        delete currentTracker.tokenExpiryTimestamp;
        delete currentTracker.refreshTokenExpiryTimestamp;
      });

      tracker.authToken = token;
      tracker.refreshToken = refreshToken;
      tracker.tokenExpiryTimestamp = tokenExpiryTimestamp;

      // we can also set the same token for every tracker with the same username, because it's the same account
      if (username)
        state.ids.forEach((tId) => {
          const currentTracker = state.trackers[tId];
          if (isJiraTrackerCfg(currentTracker) && currentTracker.username === username) {
            currentTracker.authToken = token;
            currentTracker.refreshToken = refreshToken;
            currentTracker.tokenExpiryTimestamp = tokenExpiryTimestamp;
          }
        });
    },
  },
});
