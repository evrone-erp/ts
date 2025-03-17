import { JIRA_TRACKER_API_ROOT } from 'shared/api/constants';

export const jiraUserEndpoints = {
  // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-users/#api-rest-api-3-user-get
  user: `${JIRA_TRACKER_API_ROOT}/user`,
  // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user-search/#api-rest-api-3-user-search-get
  userSearch: `${JIRA_TRACKER_API_ROOT}/user/search`,
  // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-myself/#api-rest-api-3-myself-get
  myself: `${JIRA_TRACKER_API_ROOT}/myself`,
};
