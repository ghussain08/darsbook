import React from 'react';
import AdminCard from './admin-card';
import { Box } from '@mui/material';
import Menu from './menu';
export default function Sidebar() {
    return (
        <Box p={2}>
            <AdminCard />
            <Menu />
        </Box>
    );
}
