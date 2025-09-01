import { configureStore } from '@reduxjs/toolkit';
import { locale } from 'entities/locale/model/reducers';
import { track } from 'entities/track/common/model/reducers';
import { api } from 'shared/api/api';
import { isClient } from 'shared/config/constants';
import { trackers } from 'entities/tracker/model/reducers';
import { trackersMiddleware } from 'entities/tracker/model/middlewares';
import { TRACKERS_STORAGE_KEY } from 'entities/tracker/model/constants';
import { filterObjectFields } from 'shared/lib/filterObjectFields';

// since the app only renders on client, we can get redux initial state from local storage
const getInitialState = () => {
  const trackersStr = localStorage.getItem(TRACKERS_STORAGE_KEY);
  let trackersConfig = null;
  if (trackersStr) {
    try {
      trackersConfig = JSON.parse(trackersStr);
    } catch (e) {
      console.error(e);
    }
  }

  return filterObjectFields({
    [trackers.name]: {
      ...trackers.getInitialState(),
      ...trackersConfig,
    },
  });
};

export const store = isClient
  ? configureStore({
      reducer: {
        [locale.name]: locale.reducer,
        [track.name]: track.reducer,
        [trackers.name]: trackers.reducer,
        [api.reducerPath]: api.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware).concat(trackersMiddleware),
      preloadedState: getInitialState(),
    })
  : configureStore({ reducer: {} });
