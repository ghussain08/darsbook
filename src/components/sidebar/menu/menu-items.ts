import { Dashboard, Receipt, Person } from '@mui/icons-material';
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
];
export default menuItems;
