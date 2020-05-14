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
import { useDispatch } from 'react-redux';

import { Layout, Menu } from 'antd';
import { GlobalStyle } from 'styles/global-styles';
import { refreshToken } from 'utils/auth/inMemory';
import { history } from 'utils/history';
import { sliceKey, reducer, actions } from './slice';
import { UserModel } from './types';

import { ProtectedRoute } from './components/ProtectedRoute';
import { CustomRoute } from './components/CustomRoute';
import { Footer } from './components/Footer';

import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { LoginPage } from './containers/LoginPage/Loadable';

export function App() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(true);
  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    refreshToken().then(data => {
      setLoading(false);
      dispatch(actions.userLoaded(data as UserModel));
    });
  });

  if (loading) {
    return <></>;
  }
  return (
    <Router history={history}>
      <Helmet titleTemplate="%s - Tabib" defaultTitle="Tabib">
        <meta name="description" content="Tabib application" />
      </Helmet>

      <Layout>
        <Layout.Header
        // style={{ position: 'sticky' }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Layout.Header>

        <Layout.Content style={{ margin: '24px', backgroundColor: '#fff' }}>
          <Switch>
            <ProtectedRoute exact path="/" component={HomePage} />
            <CustomRoute path="/auth/login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout.Content>

        <Footer />
      </Layout>
      <GlobalStyle />
    </Router>
  );
}
