import { isJiraTrackerCfg, TTrackerConfig } from 'entities/tracker/model/types';
import { JIRA_OAUTH_API_ROOT } from 'shared/api/constants';

export const getTrackerUrl = (endpoint: string, tracker: TTrackerConfig) => {
  if (!isJiraTrackerCfg(tracker) || !tracker.cloudId) {
    return endpoint;
  }

  const endpointWithSlash = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  return new URL(`${tracker.cloudId}${endpointWithSlash}`, JIRA_OAUTH_API_ROOT).href;
};
