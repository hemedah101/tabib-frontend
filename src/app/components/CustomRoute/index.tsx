import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from 'utils/auth/inMemory';

export const CustomRoute: React.FC<any> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated()) {
          return <Component {...props} />;
        }
        return (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        );
      }}
    />
  );
};
