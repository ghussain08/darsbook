import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import Signup from '../pages/signup';
import VerifySignupEmail from '../pages/verify-signup-email';
import Settings from '../pages/settings';
export interface IRouteList {
    isProtected: boolean;
    path: string;
    exact: boolean;
    Component: any;
}
const routes: IRouteList[] = [
    {
        path: '/login',
        Component: Login,
        exact: true,
        isProtected: false,
    },
    {
        path: '/sign-up',
        Component: Signup,
        exact: true,
        isProtected: false,
    },
    {
        path: '/verify-email',
        Component: VerifySignupEmail,
        exact: true,
        isProtected: false,
    },

    {
        path: '/d',
        Component: Dashboard,
        exact: true,
        isProtected: true,
    },
    {
        path: '/e',
        Component: Dashboard,
        exact: true,
        isProtected: true,
    },
    {
        path: '/',
        Component: Dashboard,
        exact: true,
        isProtected: true,
    },
    {
        path: '/settings',
        Component: Settings,
        exact: true,
        isProtected: true,
    },
];

export default routes;
