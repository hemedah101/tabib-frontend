import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'utils/auth/inMemory';

export const ProtectedRoute: React.FC<any> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated()) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{ pathname: '/auth/login', state: { from: props.location } }}
          />
        );
      }}
    />
  );
};
