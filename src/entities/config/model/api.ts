import { api } from 'shared/api/api';
import { TConfigStore } from './types';

export const configApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getConfig: builder.query<TConfigStore, void>({
      query: () => '/local/api/config.json',
    }),
  }),
});
