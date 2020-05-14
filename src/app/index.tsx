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
import { refreshToken } from 'utils/auth/inMemory';
import { history } from 'utils/history';
import { sliceKey, reducer } from './slice';

import { ProtectedRoute } from './components/ProtectedRoute';
import { CustomRoute } from './components/CustomRoute';

import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { LoginPage } from './containers/LoginPage/Loadable';

export function App() {
  useInjectReducer({ key: sliceKey, reducer: reducer });

  const [loading, setLoading] = React.useState(true);
  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    refreshToken().finally(() => setLoading(false));
  });

  if (loading) {
    return <></>;
  }
  return (
    <Router history={history}>
      <Helmet titleTemplate="%s - Tabib" defaultTitle="Tabib">
        <meta name="description" content="Tabib application" />
      </Helmet>

      <Switch>
        <ProtectedRoute exact path="/" component={HomePage} />
        <CustomRoute path="/auth/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </Router>
  );
}
