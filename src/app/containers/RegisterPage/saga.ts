import { put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import gql from 'graphql-tag';

import { actions } from 'app/slice';
import { HttpService } from 'utils/http/httpService';
import { history } from 'utils/history';
import { RegisterParams } from './types';
import { setToken } from 'utils/auth/inMemory';

export function* registerUser(action: PayloadAction<RegisterParams>) {
  try {
    const { payload } = action;
    const client = new HttpService();
    const mutation = gql`
      mutation signup(
        $name: String!
        $email: String!
        $password: String!
        $dateOfBirth: String!
        $gender: GenderEnum!
      ) {
        signup(
          input: {
            name: $name
            email: $email
            password: $password
            dateOfBirth: $dateOfBirth
            gender: $gender
          }
        ) {
          token
          user {
            name
            avatar
            verified
            review
            role
            gender
          }
        }
      }
    `;

    const { signup } = yield client.mutate(mutation, payload);
    yield put(actions.userLoaded(signup.user));
    setToken(signup.token);
    history.push('/');
  } catch (error) {
    yield put(actions.userError());
  }
}

export function* registerPageSaga() {
  yield takeLatest(actions.registerUser.type, registerUser);
}
