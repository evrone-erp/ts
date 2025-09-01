import { JIRA_TRACKER_API_ROOT } from 'shared/api/constants';

export const jiraIssueEndpoints = {
  // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-post
  issues: `${JIRA_TRACKER_API_ROOT}/search`,
  // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-issueidorkey-get
  issue: (issueIdOrKey: string) => `${JIRA_TRACKER_API_ROOT}/issue/${issueIdOrKey}`,
  // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-status/#api-rest-api-3-statuses-search-get
  statuses: `${JIRA_TRACKER_API_ROOT}/statuses/search`,
};
