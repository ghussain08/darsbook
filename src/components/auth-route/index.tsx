import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * create a react functional component which will check if token is present in
 * localStorage if yes then render passed component else redirect to login page
 */
const AuthRoute = ({ component: Component, ...rest }: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Redirect to="/login" />;
    }
    return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default AuthRoute;
