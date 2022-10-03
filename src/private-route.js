import React from 'react';
import {Route, Redirect} from 'react-router-dom';


const PrivateRoute = ({render, path, exact, authorizationStatus}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        if (authorizationStatus === true) {
          return (render(routeProps));
        }
        return (<Redirect to='/' />);
      }}
    />
  );
};

export default PrivateRoute;