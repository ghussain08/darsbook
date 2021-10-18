import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import Signup from '../pages/signup';
export interface IRouteList {
    isProtected: boolean;
    path: string;
    exact: boolean;
    Component: any;
}
const routes: IRouteList[] = [
    {
        path: '/d',
        Component: Dashboard,
        exact: true,
        isProtected: true,
    },
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
];

export default routes;
