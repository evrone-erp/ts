import { YANDEX_TRACKER_API_ROOT } from 'shared/api/constants';

export const yandexTrackEndpoints = {
  tracks: `${YANDEX_TRACKER_API_ROOT}/worklog/_search`,
  issueTracks: (issueIdOrKey: string) => `${YANDEX_TRACKER_API_ROOT}/issues/${issueIdOrKey}/worklog`,
  track: (issueIdOrKey: string, trackId: string | number) =>
    `${YANDEX_TRACKER_API_ROOT}/issues/${issueIdOrKey}/worklog/${trackId}`,
};
