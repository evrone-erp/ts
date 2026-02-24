import { track } from 'entities/track/common/model/reducers';
import type { TTrackStore } from 'entities/track/common/model/types';
import type { TAppState } from 'shared/lib/types';

const selectTrack = (state: TAppState): TTrackStore => state[track.name] as TTrackStore;

export const selectTrackInputCreate = (state: TAppState) => selectTrack(state).inputCreate;
export const selectTrackInputDelete = (state: TAppState) => selectTrack(state).inputDelete;
