import { Dashboard, Receipt, Person, Settings } from '@mui/icons-material';
const menuItems = [
    {
        name: 'Dashboard',
        to: '/',
        icon: Dashboard,
    },
    {
        name: 'Orders',
        to: '/d',
        icon: Receipt,
    },
    {
        name: 'Customers',
        to: '/e',
        icon: Person,
    },
    {
        name: 'Settings',
        to: '/settings',
        icon: Settings,
    },
];
export default menuItems;
