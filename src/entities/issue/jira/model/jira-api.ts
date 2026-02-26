import type { FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import type { QueryReturnValue } from '@reduxjs/toolkit/query';
import { api } from 'shared/api';
import { getTrackerHeaders } from 'entities/tracker/lib/getTrackerHeaders';
import { createJiraIssueRequest } from 'entities/issue/jira/model/createJiraIssueRequest';
import type {
  TJiraIssue,
  TJiraIssuesResponse,
  TJiraIssueStatusDescriptionsResponse,
} from 'entities/issue/jira/model/types';
import type {
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
import { getTrackerUrl } from 'entities/tracker/lib/getTrackerUrl';

const PAGE_SIZE = 100;

type TJiraIssuesQueryResult = QueryReturnValue<TJiraIssuesResponse, FetchBaseQueryError, FetchBaseQueryMeta>;

export const jiraIssueApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getJiraIssue: build.query<TIssue, TGetIssueParams>({
      query: ({ issueIdOrKey, tracker }) => ({
        url: getTrackerUrl(jiraIssueEndpoints.issue(issueIdOrKey), tracker),
        headers: getTrackerHeaders(tracker),
      }),
      transformResponse: (data: TJiraIssue) => transformJiraIssueToCommonIssue(data),
    }),
    getJiraIssues: build.query<TIssue[], TGetIssuesParams>({
      async queryFn(arg, _, __, fetchWithBQ) {
        const jql = createJiraIssueRequest(arg);
        if (!jql) {
          return { error: { status: 400, data: 'JQL query was not constructed', error: 'Bad Request' } };
        }
        const allIssues: TJiraIssue[] = [];
        let nextPageToken: string | undefined;

        do {
          const result = (await fetchWithBQ({
            url: getTrackerUrl(jiraIssueEndpoints.issues, arg.tracker),
            method: 'POST',
            body: {
              jql,
              maxResults: PAGE_SIZE,
              fields: ['summary', 'status'],
              ...(nextPageToken && { nextPageToken }),
            },
            headers: getTrackerHeaders(arg.tracker),
          })) as TJiraIssuesQueryResult;

          if (result.error) {
            return { error: result.error };
          }
          if (!result.data) {
            break;
          }
          allIssues.push(...result.data.issues);
          nextPageToken = result.data.isLast ? undefined : result.data.nextPageToken;
        } while (nextPageToken);

        return { data: transformJiraIssuesToCommonIssues(allIssues) };
      },
    }),
    getJiraStatuses: build.query<TIssueStatusDescription[], TGetIssuesStatusesQuery>({
      query: ({ tracker }) => ({
        url: getTrackerUrl(jiraIssueEndpoints.statuses, tracker),
        headers: getTrackerHeaders(tracker),
      }),
      transformResponse: ({ values }: TJiraIssueStatusDescriptionsResponse) => values,
    }),
  }),
});
