import { configureStore } from '@reduxjs/toolkit';
import { auth } from 'entities/auth/model/reducers';
import { locale } from 'entities/locale/model/reducers';
import { track } from 'entities/track/model/reducers';
import { organization } from 'entities/organization/model/reducers';
import { api } from 'shared/api/api';
import { isClient } from 'shared/config/constants';

export const store = isClient
  ? configureStore({
      reducer: {
        [auth.name]: auth.reducer,
        [locale.name]: locale.reducer,
        [track.name]: track.reducer,
        [organization.name]: organization.reducer,
        [api.reducerPath]: api.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    })
  : configureStore({ reducer: {} });
