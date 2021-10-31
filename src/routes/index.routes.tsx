import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ResponsiveDrawer from '../components/header';
import routes from './route-list';

export default function Routes() {
    const publicRoutes = routes.filter((route) => !route.isProtected);
    const privateRoutes = routes.filter((route) => route.isProtected);

    return (
        <Router>
            <Switch>
                {routes.map((route, index) => {
                    const Component = route.Component;
                    return (
                        <Route key={route.path} exact={route.exact} path={route.path}>
                            <Component />
                        </Route>
                    );
                })}
            </Switch>
        </Router>
    );
}
