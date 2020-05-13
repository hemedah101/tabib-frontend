import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { handleError } from './error';

const SKIPPED_ERRORS = ['refreshToken'];

export class HttpService {
  private client: ApolloClient<unknown>;

  constructor(token: string = '') {
    this.client = new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) => {
              if (!SKIPPED_ERRORS.includes(String(path))) {
                handleError(message);
              }
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
              );
            });
          if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        new HttpLink({
          uri: process.env.REACT_APP_API,
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        }),
      ]),
      cache: new InMemoryCache(),
    });
  }

  async query(query: any, variables = {}) {
    return this.client
      .query({ query, variables })
      .then(response => response.data);
  }

  async mutate(mutation: any, variables = {}) {
    return this.client
      .mutate({ mutation, variables })
      .then(response => response.data);
  }
}
