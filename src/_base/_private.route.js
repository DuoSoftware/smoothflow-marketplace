import React from 'react';
import { Route } from 'react-router-dom';
import Auth from './_auth.redirect.js';
import URLs from './_urls';

const PrivateRoute = ({ component: Component, is_logged_in, ...rest }) => (
    <Route
        { ...rest }
        render = {
            (props) => is_logged_in
            // (props) => true === true
            ?   <Component {...props} />
            :   <Auth url={URLs.auth.signin} _rollback_point={window.location.href} />
        }
    />
);

export default PrivateRoute;