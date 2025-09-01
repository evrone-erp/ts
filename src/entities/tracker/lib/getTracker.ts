import { TTrackerConfig, TTrackerStore } from 'entities/tracker/model/types';

export const getTracker = (trackersState: TTrackerStore, trackerId: string): TTrackerConfig | undefined =>
  trackersState.trackers[trackerId];
