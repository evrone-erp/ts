import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TSetAuthTokenPayload,
  TSetMainTrackerPayload,
  TSetUsernamePayload,
  TTrackerConfig,
  TTrackerStore,
  TUpsertTrackerPayload,
} from 'entities/tracker/model/types';

const initialState: TTrackerStore = {
  trackers: {},
  ids: [],
  mainTrackerId: null,
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

      if (state.mainTrackerId === prevTracker?.id) {
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
    setAuthToken(state, { payload: { id, token, lastLogin } }: PayloadAction<TSetAuthTokenPayload>) {
      const trackerId = id ?? state.mainTrackerId;

      if (!trackerId || !state.trackers[trackerId]) {
        return;
      }

      // we need to remove lastLogin from other trackers so that user would get redirected to auth page as soon as they
      // open another tracker, without seeing 403 error page
      state.ids.forEach((tId) => {
        delete state.trackers[tId].lastLogin;
      });

      // set token and last login to the tracker
      state.trackers[trackerId].authToken = token;
      state.trackers[trackerId].lastLogin = lastLogin;
      const { username } = state.trackers[trackerId];

      // we can also set the same token for every tracker with the same username, because it's the same account
      if (username)
        state.ids.forEach((tId) => {
          if (state.trackers[tId].username === username) {
            state.trackers[tId].authToken = token;
            state.trackers[tId].lastLogin = lastLogin;
          }
        });
    },
    logoutTracker(state, { payload: tracker }: PayloadAction<TTrackerConfig>) {
      const stateTracker = state.trackers[tracker.id];
      if (!stateTracker) {
        return;
      }

      state.ids.forEach((tId) => {
        // only log out trackers of the same type
        if (stateTracker.type === state.trackers[tId].type) {
          delete state.trackers[tId].lastLogin;
        }
      });
    },
  },
});
