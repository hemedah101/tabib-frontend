import React from 'react';
import { Route } from 'react-router-dom';

export const CustomComponent: React.FC<any> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        const withHeaderRoutes = ['/'];
        if (withHeaderRoutes.includes(props.location.pathname)) {
          return <Component {...props} {...rest} />;
        }
      }}
    />
  );
};
