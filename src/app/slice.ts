import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { ContainerState, UserModel } from './types';
import { LoginParams } from './containers/LoginPage/types';
import { RegisterParams } from './containers/RegisterPage/types';
import { UpdateProfileInput } from './containers/AccountPage/types';

// The initial state of the Global container
export const initialState: ContainerState = {
  user: {
    name: '',
    avatar: '',
    verified: false,
    review: '',
    gender: '',
    role: '',
    relationship: '',
    job: '',
  },
  loading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    registerUser(state, action: PayloadAction<RegisterParams>) {
      state.loading = true;
    },
    loginUser(state, action: PayloadAction<LoginParams>) {
      state.loading = true;
    },
    updateUser(state, action: PayloadAction<UpdateProfileInput>) {
      const updates = action.payload;
      state.loading = false;
      state.user = { ...state.user, ...updates };
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
