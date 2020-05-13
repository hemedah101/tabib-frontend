import gql from 'graphql-tag';

import { HttpService } from 'utils/http/httpService';
import { history } from 'utils/history';
import { JWT } from './types';

let inMemoryToken: JWT = {
  token: '',
  expiry: Date.now(),
};

export function setToken(token: string): void {
  inMemoryToken.token = token;
  inMemoryToken.expiry = Date.now() + 1 * 60 * 1000;
}

export async function getToken(): Promise<string> {
  if (inMemoryToken.expiry < Date.now()) {
    await refreshToken();
  }
  return inMemoryToken.token;
}

export async function refreshToken(): Promise<void> {
  const client = new HttpService();
  const query = gql`
    mutation {
      refreshToken {
        token
      }
    }
  `;

  try {
    const data = await client.mutate(query);
    const token = data.refreshToken.token;
    setToken(token);
  } catch (error) {
    await logout();
  }
}

export async function logout(): Promise<void> {
  if (inMemoryToken.token.length) {
    const client = new HttpService(inMemoryToken.token);
    const mutation = gql`
      mutation {
        logoutAll
      }
    `;
    await client.mutate(mutation);

    inMemoryToken.token = '';
    inMemoryToken.expiry = Date.now();
  }

  // TODO to support logging out from all windows
  window.localStorage.setItem('logout', String(Date.now()));
  history.push('/auth/login');
}

export function isAuthenticated(): boolean {
  return inMemoryToken.expiry > Date.now();
}
