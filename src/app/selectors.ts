import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.global || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  globalState => globalState.loading,
);

export const selectName = createSelector(
  [selectDomain],
  globalState => globalState.user.name,
);

export const selectAvatar = createSelector(
  [selectDomain],
  globalState => globalState.user.avatar,
);
