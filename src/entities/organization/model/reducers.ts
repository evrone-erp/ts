import { createSlice } from '@reduxjs/toolkit';
import { TOrganizationStore } from 'entities/organization/model/types';

const initialState: TOrganizationStore = {
  currentOrgId: null,
};

export const organization = createSlice({
  initialState,
  name: 'organization',
  reducers: {
    setCurrentOrgId: (state, { payload }) => {
      state.currentOrgId = payload;
    },
    removeCurrentOrgId: (state) => {
      state.currentOrgId = initialState.currentOrgId;
    },
  },
});
