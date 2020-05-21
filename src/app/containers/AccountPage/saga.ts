import { put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import gql from 'graphql-tag';

import { actions } from 'app/slice';
import { UpdateProfileInput } from './types';
import { HttpService } from 'utils/http/httpService';
import { getToken } from 'utils/auth/inMemory';

export function* updateUser(action: PayloadAction<UpdateProfileInput>) {
  const { payload } = action;

  const token = yield getToken();
  const client = new HttpService(token);
  const mutation = gql`
    mutation updateProfile(
      $name: String
      $dateOfBirth: String
      $gender: String
      $relationship: String
      $job: String
    ) {
      updateProfile(
        input: {
          name: $name
          dateOfBirth: $dateOfBirth
          gender: $gender
          relationship: $relationship
          job: $job
        }
      ) {
        _id
      }
    }
  `;

  try {
    yield client.mutate(mutation, payload);
  } catch (error) {
    yield put(actions.userError());
  }
}

export function* accountPageSaga() {
  yield takeLatest(actions.updateUser.type, updateUser);
}
