import { put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import gql from 'graphql-tag';

import { actions } from 'app/slice';
import { HttpService } from 'utils/http/httpService';
import { history } from 'utils/history';
import { LoginParams } from './types';

export function* loginUser(action: PayloadAction<LoginParams>) {
  try {
    const { payload } = action;
    const client = new HttpService();
    const mutation = gql`
      mutation Login($email: String!, $password: String!) {
        login(input: { email: $email, password: $password }) {
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

    const { login } = yield client.mutate(mutation, payload);
    yield put(actions.userLoaded(login.user));
    yield history.push('/');
  } catch (error) {
    yield put(actions.userError());
  }
}

export function* loginPageSaga() {
  yield takeLatest(actions.loginUser.type, loginUser);
}
