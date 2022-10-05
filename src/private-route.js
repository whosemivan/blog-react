import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {parse} from "./utils";

const PrivateRoute = ({render, path, exact, authorizationStatus}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        if (parse(authorizationStatus) === true) {
          return (render(routeProps));
        }
        console.log(typeof authorizationStatus);
        return (<Redirect to='/' />);
      }}
    />
  );
};

export default PrivateRoute;