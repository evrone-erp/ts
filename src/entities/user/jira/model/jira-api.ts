import { api } from 'shared/api/api';
import { getTrackerHeaders } from 'entities/tracker/lib/getTrackerHeaders';
import { jiraUserEndpoints } from 'entities/user/jira/model/endpoints';
import { JiraAccountType, TJiraUser } from 'entities/user/jira/model/types';
import { TGetMyselfParams, TGetUserParams, TGetUsersParams } from 'entities/user/common/model/types';
import { getTrackerUrl } from 'entities/tracker/lib/getTrackerUrl';

export const jiraUserApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMyselfJira: builder.query<TJiraUser, TGetMyselfParams>({
      query: ({ tracker }) => ({
        url: getTrackerUrl(jiraUserEndpoints.myself, tracker),
        headers: getTrackerHeaders(tracker),
      }),
    }),
    getJiraUser: builder.query<TJiraUser, TGetUserParams>({
      query: ({ userId, tracker }) => ({
        url: getTrackerUrl(jiraUserEndpoints.user, tracker),
        headers: getTrackerHeaders(tracker),
        params: {
          accountId: userId,
        },
      }),
    }),
    getJiraUsersList: builder.query<TJiraUser[], TGetUsersParams>({
      query: ({ tracker }) => ({
        url: getTrackerUrl(jiraUserEndpoints.userSearch, tracker),
        headers: getTrackerHeaders(tracker),
        params: {
          query: '',
        },
      }),
      transformResponse: (data: TJiraUser[]) =>
        data.filter(({ active, accountType }) => active && accountType !== JiraAccountType.App),
    }),
  }),
});
