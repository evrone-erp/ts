import { isJiraTrackerCfg, isYandexTrackerCfg, TTrackerConfig } from 'entities/tracker/model/types';

export const getTrackerHeaders = (
  tracker: TTrackerConfig | undefined,
  additionalHeaders?: Record<string, string | undefined>,
) => {
  const headers = new Headers();
  if (isYandexTrackerCfg(tracker)) {
    headers.set(tracker.isCloud ? 'X-Cloud-Org-ID' : 'X-Org-ID', encodeURIComponent(tracker.orgId));
    headers.set('Authorization', `OAuth ${tracker.authToken}`);
  } else if (isJiraTrackerCfg(tracker)) {
    headers.set('Authorization', `Bearer  ${tracker.authToken}`);
  }

  if (additionalHeaders) {
    Object.entries(additionalHeaders).forEach(([key, value]) => {
      if (value !== undefined) {
        headers.set(key, value);
      }
    });
  }

  return headers;
};
