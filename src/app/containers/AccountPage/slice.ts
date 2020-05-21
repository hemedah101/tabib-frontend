import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the AccountPage container
export const initialState: ContainerState = {
  email: '',
  loading: false,
};

const accountPageSlice = createSlice({
  name: 'accountPage',
  initialState,
  reducers: {
    updateEmail(state, action: PayloadAction<any>) {},
  },
});

export const { actions, reducer, name: sliceKey } = accountPageSlice;
