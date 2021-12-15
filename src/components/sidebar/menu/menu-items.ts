import { Dashboard, Receipt, AddCircle, Settings, Logout } from "@mui/icons-material";
const menuItems = [
    {
        name: "Dashboard",
        to: "/",
        icon: Dashboard,
    },

    {
        name: "New Bill",
        to: "/new-bill",
        icon: AddCircle,
    },
    {
        name: "Transactions",
        to: "/transactions?nextCursor=null&isActive=1",
        icon: Receipt,
    },
    {
        name: "Settings",
        to: "/settings",
        icon: Settings,
    },
    {
        name: "Logout",
        to: "/logout",
        icon: Logout,
    },
];
export default menuItems;
