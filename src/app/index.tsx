/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, Router } from 'react-router-dom';
import { useInjectReducer } from 'redux-injectors';

import { GlobalStyle } from 'styles/global-styles';
import { sliceKey, reducer } from './slice';

import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { LoginPage } from './containers/LoginPage/Loadable';
import { history } from 'utils/history';

export function App() {
  useInjectReducer({ key: sliceKey, reducer: reducer });

  return (
    <Router history={history}>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/auth/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </Router>
  );
}
