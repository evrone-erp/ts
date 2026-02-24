import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { TLocale, TLocaleStore } from 'entities/locale/model/types';

const initialState: TLocaleStore = {
  current: null,
};

export const locale = createSlice({
  initialState,
  name: 'locale',
  reducers: {
    setCurrent: (state, { payload }: PayloadAction<TLocale>) => {
      state.current = payload;
    },
  },
});
