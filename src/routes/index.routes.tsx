import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ResponsiveDrawer from "../components/header";
import { Suspense } from "react";
import routes from "./route-list";
import AuthRoute from "../components/auth-route";
import CheckAuth from "../components/check-auth";
import FullPageLoader from "../sharable/fullpage-loader";
export default function Routes() {
    const publicRoutes = routes.filter((route) => !route.isProtected);
    const privateRoutes = routes.filter((route) => route.isProtected);

    return (
        <Router>
            <Switch>
                {publicRoutes.map((route, index) => {
                    const Component = route.Component;
                    return (
                        <Route key={route.path} exact={route.exact} path={route.path}>
                            <Component />
                        </Route>
                    );
                })}
                <CheckAuth>
                    <ResponsiveDrawer>
                        <Suspense fallback={() => <FullPageLoader isOpen={true} />}>
                            {privateRoutes.map((route, index) => {
                                const Component = route.Component;
                                return (
                                    <AuthRoute
                                        key={route.path}
                                        exact={route.exact}
                                        path={route.path}
                                        component={Component}
                                    />
                                );
                            })}
                        </Suspense>
                    </ResponsiveDrawer>
                </CheckAuth>
            </Switch>
        </Router>
    );
}
