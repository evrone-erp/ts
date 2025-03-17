import { YANDEX_TRACKER_API_ROOT } from 'shared/api/constants';

export const yandexIssueEndpoints = {
  issue: (issueIdOrKey: string) => `${YANDEX_TRACKER_API_ROOT}/issues/${issueIdOrKey}`,
  issues: `${YANDEX_TRACKER_API_ROOT}/issues/_search`,
  statuses: `${YANDEX_TRACKER_API_ROOT}/statuses`,
};
