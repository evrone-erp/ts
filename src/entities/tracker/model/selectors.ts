import { TAppState } from 'shared/lib/types';
import { trackers } from 'entities/tracker/model/reducers';
import { TTrackerStore } from 'entities/tracker/model/types';

export const selectTrackers = (state: TAppState) => state[trackers.name] as TTrackerStore;
