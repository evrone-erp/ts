import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { TTrackInputCreate, TTrackInputDelete, TTrackStore } from 'entities/track/common/model/types';

const initialState: TTrackStore = {};

export const track = createSlice({
  initialState,
  name: 'track',
  reducers: {
    setInputCreate: (state, { payload }: PayloadAction<TTrackInputCreate | undefined>) => {
      state.inputCreate = payload;
    },
    setInputDelete: (state, { payload }: PayloadAction<TTrackInputDelete | undefined>) => {
      state.inputDelete = payload;
    },
  },
});
