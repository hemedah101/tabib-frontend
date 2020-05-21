import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.accountPage || initialState;

export const selectAccountPage = createSelector(
  [selectDomain],
  accountPageState => accountPageState,
);
