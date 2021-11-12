import { Dashboard, Receipt, AddCircle, Settings } from "@mui/icons-material";
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
        to: "/transactions",
        icon: Receipt,
    },
    {
        name: "Settings",
        to: "/settings",
        icon: Settings,
    },
];
export default menuItems;
