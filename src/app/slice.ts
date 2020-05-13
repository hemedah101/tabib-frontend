import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { ContainerState, UserModel } from './types';
import { LoginParams } from './containers/LoginPage/types';

// The initial state of the Global container
export const initialState: ContainerState = {
  user: {
    name: '',
    avatar: '',
    verified: false,
    review: '',
    gender: '',
    role: '',
  },
  loading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<LoginParams>) {
      state.loading = true;
    },
    loadUser(state) {
      state.loading = true;
    },
    userLoaded(state, action: PayloadAction<UserModel>) {
      const user = action.payload;
      state.user = { ...user };
      state.loading = false;
    },
    userError(state) {
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = globalSlice;
