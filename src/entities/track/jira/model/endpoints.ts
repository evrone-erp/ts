import { JIRA_TRACKER_API_ROOT } from 'shared/api/constants';

export const jiraTrackEndpoints = {
  // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklogs/#api-rest-api-3-issue-issueidorkey-worklog-get
  issueTracks: (issueIdOrKey: string) => `${JIRA_TRACKER_API_ROOT}/issue/${issueIdOrKey}/worklog`,
  // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklogs/#api-rest-api-3-issue-issueidorkey-worklog-id-get
  track: (issueIdOrKey: string, trackId: string | number) =>
    `${JIRA_TRACKER_API_ROOT}/issue/${issueIdOrKey}/worklog/${trackId}`,
};
