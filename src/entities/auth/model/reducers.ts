import { createSlice } from '@reduxjs/toolkit';
import { TAuthStore } from 'entities/auth/model/types';

const initialState: TAuthStore = {
  token: '',
};

export const auth = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    removeToken: (state) => {
      state.token = initialState.token;
    },
  },
});
