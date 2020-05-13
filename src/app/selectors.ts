import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.global || initialState;

export const selectIsAuthenticated = createSelector(
  [selectDomain],
  globalState => globalState.isAuthenticated,
);

export const selectName = createSelector(
  [selectDomain],
  globalState => globalState.user.name,
);

export const selectAvatar = createSelector(
  [selectDomain],
  globalState => globalState.user.avatar,
);
