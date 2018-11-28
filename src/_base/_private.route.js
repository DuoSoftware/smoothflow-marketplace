import React from 'react';
import { Route } from 'react-router-dom';
import Auth from './_auth.redirect.js';
import URLs from './_urls';

const _token = localStorage.getItem('satellizer_token');

const PrivateRoute = ({ component: Component, is_logged_in, ...rest }) => (
    <Route
        { ...rest }
        render = {
            (props) => _token
            // (props) => true === true
            ?   <Component {...props} />
            :   <Auth url={URLs.auth.signin} _rollback_point={window.location.href} />
        }
    />
);

export default PrivateRoute;