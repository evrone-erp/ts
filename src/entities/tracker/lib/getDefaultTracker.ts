import { Tracker, TYandexTrackerConfig } from 'entities/tracker/model/types';
import { getTrackerIdFromName } from 'entities/tracker/lib/getTrackerIdFromName';

const yandex360Regex = /^\d+$/;

/**
 * default tracker is always Yandex Tracker, because Timesheet only supported Yandex Tracker in the past
 */
export const getDefaultTracker = (orgId: string): TYandexTrackerConfig => {
  const name = 'Yandex Timesheet';
  return {
    id: getTrackerIdFromName(name),
    url: 'https://tracker.yandex.ru/',
    name,
    isCloud: !yandex360Regex.test(orgId),
    orgId,
    type: Tracker.Yandex,
    // username will be set in useSetTrackerUsername hook when user opens default tracker
    username: '',
  };
};
