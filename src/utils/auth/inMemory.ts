import gql from 'graphql-tag';

import { HttpService } from 'utils/http/httpService';
import { history } from 'utils/history';
import { JWT, refreshTokenPayload } from './types';
import { UserModel } from 'app/types';

let inMemoryToken: JWT = {
  token: '',
  expiry: Date.now(),
};

export function setToken(token: string): void {
  inMemoryToken.token = token;
  inMemoryToken.expiry = Date.now() + 15 * 60 * 1000;
}

export async function getToken(): Promise<string> {
  if (inMemoryToken.expiry < Date.now()) {
    await refreshToken();
  }
  return inMemoryToken.token;
}

export async function refreshToken(): Promise<UserModel | void> {
  const client = new HttpService();
  const query = gql`
    {
      refreshToken {
        token
        user {
          verified
          role
          review
          gender
          name
          avatar
          relationship
          job
        }
      }
    }
  `;

  try {
    const {
      refreshToken: { token, user },
    }: refreshTokenPayload = await client.query(query);
    setToken(token);
    return user;
  } catch (error) {
    if (!history.location.pathname.includes('auth')) {
      await logout();
    }
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

    resetToken();
  }

  // TODO to support logging out from all windows
  window.localStorage.setItem('logout', String(Date.now()));
  history.push('/auth/login');
}

export function isAuthenticated(): boolean {
  return inMemoryToken.token.length > 0;
}

function resetToken(): void {
  inMemoryToken.token = '';
  inMemoryToken.expiry = Date.now();
}
