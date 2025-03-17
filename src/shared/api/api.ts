import { createApi } from '@reduxjs/toolkit/query/react';
import { createApiBaseQuery } from './api-base-query';

export const api = createApi({
  baseQuery: createApiBaseQuery({ baseUrl: '/' }),
  endpoints: () => ({}),
  tagTypes: ['Track', 'JiraTrack', 'Locale', 'Auth', 'Organization'],
});
