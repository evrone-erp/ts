import { api, fetchAllPages, TFetchAllPagesBaseQueryResult } from 'shared/api';
import { createIssueRequest } from 'entities/issue/model/createIssueRequest';
import { TLocale } from 'entities/locale/model/types';
import { TGetIssueParams, TGetIssuesParams, TIssue, TStatus } from './types';

export const issueApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getIssue: build.query<TIssue, TGetIssueParams>({
      query: ({ issueIdOrKey }) => `/tracker/v2/issues/${issueIdOrKey}`,
    }),
    getIssues: build.query<TIssue[], TGetIssuesParams>({
      async queryFn(arg, _, __, fetchWithBQ) {
        return fetchAllPages(
          (page) =>
            fetchWithBQ({
              url: `/tracker/v2/issues/_search`,
              method: 'POST',
              body: createIssueRequest(arg),
              params: { page, perPage: 999 },
              headers: {
                // if we don't send this header, Yandex Tracker will always respond with russian status names
                'Accept-language': arg.language ?? undefined,
              },
            }) as TFetchAllPagesBaseQueryResult<TIssue>,
        );
      },
    }),
    getStatuses: build.query<TStatus[], { language: TLocale }>({
      query: ({ language }) => ({
        // this API is undocumented it Yandex Tracker docs
        // it sends English titles only if Accept-language header is provided
        url: `/tracker/v2/statuses`,
        headers: {
          'Accept-language': language,
        },
      }),
    }),
  }),
});
