import { JIRA_MIDDLEWARE_API_ROOT } from 'shared/api/constants';

export const jiraAuthEndpoints = {
  // https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#2--exchange-authorization-code-for-access-token
  token: 'https://auth.atlassian.com/oauth/token',
  // https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#3-1-get-the-cloudid-for-your-site
  accessibleResources: 'https://api.atlassian.com/oauth/token/accessible-resources',
  refresh: `${JIRA_MIDDLEWARE_API_ROOT}/refresh`,
};
