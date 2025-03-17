import { auth } from 'entities/auth/model/reducers';
import { TAuthStore, TAuthToken } from 'entities/auth/model/types';
import { TAppState } from 'shared/lib/types';

export const selectAuth = (state: TAppState) => state[auth.name] as TAuthStore;

export const getAuthToken = (authData: TAuthStore) => authData.token;
export const selectAuthToken = (state: TAppState): TAuthToken => getAuthToken(selectAuth(state));
