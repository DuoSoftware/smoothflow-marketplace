import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import Auth from './_auth.redirect.js';
import URLs from './_urls';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
      {...rest}
      render = {
              (props) => props.validUser === true
        ? <Component {...props} />
        : <Auth url={URLs.auth} _rollback_point={window.location.pathname} />}
    />
);

export default PrivateRoute;