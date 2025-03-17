import { createApi } from '@reduxjs/toolkit/query/react';
import { createApiBaseQuery } from './api-base-query';

export const api = createApi({
  baseQuery: createApiBaseQuery({ baseUrl: '/' }),
  endpoints: () => ({}),
  tagTypes: ['Tack', 'Track', 'Locale', 'Auth', 'Organization'],
});
