import { api } from 'shared/api/api';
import {
  TJiraAccessibleResource,
  TJiraRefreshedTokenRequest,
  TJiraRefreshedTokenResponse,
} from 'entities/auth/model/jira/types';
import { jiraAuthEndpoints } from 'entities/auth/model/jira/endpoints';

export const jiraAuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAccessibleResources: builder.query<TJiraAccessibleResource[], string>({
      query: (token) => ({
        url: jiraAuthEndpoints.accessibleResources,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      // normalize urls
      transformResponse: (items: TJiraAccessibleResource[]) => items.map((i) => ({ ...i, url: new URL(i.url).href })),
    }),
    refreshToken: builder.mutation<TJiraRefreshedTokenResponse, TJiraRefreshedTokenRequest>({
      query: ({ clientId, refreshToken }) => ({
        url: jiraAuthEndpoints.refresh,
        method: 'POST',
        body: {
          clientId,
          refreshToken,
        },
      }),
    }),
  }),
});
