import { lazy } from "react";
import Login from "../pages/login";
import Signup from "../pages/signup";
import VerifySignupEmail from "../pages/verify-signup-email";
import Logout from "../pages/logout";
const DashboardPage = lazy(() => import("../pages/dashboard"));
const SettingsPage = lazy(() => import("../pages/settings"));
const NewBillPage = lazy(() => import("../pages/new-bill"));
const TransactionPage = lazy(() => import("../pages/transactions"));
export interface IRouteList {
    isProtected: boolean;
    path: string;
    exact: boolean;
    Component: any;
}
const routes: IRouteList[] = [
    {
        path: "/login",
        Component: Login,
        exact: true,
        isProtected: false,
    },
    {
        path: "/sign-up",
        Component: Signup,
        exact: true,
        isProtected: false,
    },
    {
        path: "/verify-email",
        Component: VerifySignupEmail,
        exact: true,
        isProtected: false,
    },
    {
        path: "/",
        Component: DashboardPage,
        exact: true,
        isProtected: true,
    },
    {
        path: "/settings",
        Component: SettingsPage,
        exact: true,
        isProtected: true,
    },
    {
        path: "/new-bill",
        Component: NewBillPage,
        exact: true,
        isProtected: true,
    },
    {
        path: "/transactions",
        Component: TransactionPage,
        exact: true,
        isProtected: true,
    },
    {
        path: "/logout",
        Component: Logout,
        exact: true,
        isProtected: true,
    },
];

export default routes;
