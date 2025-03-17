import { isYandexTrackerCfg, TTrackerStore } from 'entities/tracker/model/types';

export const findYandexTrackerByOrgId = (trackersState: TTrackerStore, orgId: string) =>
  Object.values(trackersState.trackers).find((tracker) => isYandexTrackerCfg(tracker) && tracker.orgId === orgId);
