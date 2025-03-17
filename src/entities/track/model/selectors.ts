import { track } from 'entities/track/model/reducers';
import { TTrackStore } from 'entities/track/model/types';
import { TAppState } from 'shared/lib/types';

const selectTrack = (state: TAppState): TTrackStore => state[track.name] as TTrackStore;

export const selectTrackInputCreate = (state: TAppState) => selectTrack(state).inputCreate;
export const selectTrackInputDelete = (state: TAppState) => selectTrack(state).inputDelete;
