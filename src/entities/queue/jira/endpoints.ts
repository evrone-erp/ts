import { JIRA_TRACKER_API_ROOT } from 'shared/api/constants';

export const jiraProjectsEndpoints = {
  // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-projects/#api-rest-api-3-project-search-get
  projectSearch: `${JIRA_TRACKER_API_ROOT}/project/search`,
};
