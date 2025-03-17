import { api, fetchAllPages, getTotalPagesJira, TFetchAllPagesBaseQueryResult } from 'shared/api';
import { TGetQueuesParams, TQueue } from 'entities/queue/common/model/types';
import { getTrackerHeaders } from 'entities/tracker/lib/getTrackerHeaders';
import { jiraProjectsEndpoints } from 'entities/queue/jira/endpoints';
import { TJiraProjectsResponse } from 'entities/queue/jira/types';

export const jiraProjectApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProjects: build.query<TQueue[], TGetQueuesParams>({
      async queryFn({ tracker }, _, __, fetchWithBQ) {
        const allProjects = await fetchAllPages(
          (page) =>
            fetchWithBQ({
              url: jiraProjectsEndpoints.projectSearch,
              headers: getTrackerHeaders(tracker),
              params: {
                startAt: (page - 1) * 100,
                maxResults: 100,
              },
            }) as TFetchAllPagesBaseQueryResult<TJiraProjectsResponse>,
          ({ values }) => values,
          getTotalPagesJira,
        );

        if (allProjects.error) {
          return { error: allProjects.error };
        }
        return { data: allProjects.data };
      },
    }),
  }),
});
