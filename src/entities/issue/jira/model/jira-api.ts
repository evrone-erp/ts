import { api, fetchAllPages, getTotalPagesJira, TFetchAllPagesBaseQueryResult } from 'shared/api';
import { getTrackerHeaders } from 'entities/tracker/lib/getTrackerHeaders';
import { createJiraIssueRequest } from 'entities/issue/jira/model/createJiraIssueRequest';
import { TJiraIssue, TJiraIssuesResponse, TJiraIssueStatusDescriptionsResponse } from 'entities/issue/jira/model/types';
import {
  TGetIssueParams,
  TGetIssuesParams,
  TGetIssuesStatusesQuery,
  TIssue,
  TIssueStatusDescription,
} from 'entities/issue/common/model/types';
import {
  transformJiraIssuesToCommonIssues,
  transformJiraIssueToCommonIssue,
} from 'entities/issue/jira/lib/transformJiraIssuesToCommonIssues';
import { jiraIssueEndpoints } from 'entities/issue/jira/model/endpoints';

export const jiraIssueApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getJiraIssue: build.query<TIssue, TGetIssueParams>({
      query: ({ issueIdOrKey, tracker }) => ({
        url: jiraIssueEndpoints.issue(issueIdOrKey),
        headers: getTrackerHeaders(tracker),
      }),
      transformResponse: (data: TJiraIssue) => transformJiraIssueToCommonIssue(data),
    }),
    getJiraIssues: build.query<TIssue[], TGetIssuesParams>({
      async queryFn(arg, _, __, fetchWithBQ) {
        const allIssues = await fetchAllPages(
          (page) =>
            fetchWithBQ({
              url: jiraIssueEndpoints.issues,
              method: 'POST',
              body: {
                jql: createJiraIssueRequest(arg),
                startAt: (page - 1) * 100,
                maxResults: 100,
                validateQuery: 'warn',
              },
              headers: getTrackerHeaders(arg.tracker),
            }) as TFetchAllPagesBaseQueryResult<TJiraIssuesResponse>,
          ({ issues }) => issues,
          getTotalPagesJira,
        );

        if (allIssues.error) {
          return { error: allIssues.error };
        }
        return { data: transformJiraIssuesToCommonIssues(allIssues.data) };
      },
    }),
    getJiraStatuses: build.query<TIssueStatusDescription[], TGetIssuesStatusesQuery>({
      query: ({ tracker }) => ({
        url: jiraIssueEndpoints.statuses,
        headers: getTrackerHeaders(tracker),
      }),
      transformResponse: ({ values }: TJiraIssueStatusDescriptionsResponse) => values,
    }),
  }),
});
