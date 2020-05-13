import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { ContainerState, UserModel } from './types';

// The initial state of the Global container
export const initialState: ContainerState = {
  isAuthenticated: false,
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
    authenticate(state) {
      state.loading = true;
    },
    authenticateSuccess(state) {
      state.isAuthenticated = true;
      state.loading = false;
    },
    authenticateError(state) {
      state.isAuthenticated = false;
      state.loading = false;
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
