import React from 'react';
import BrandName from './brand-name';
import { Box, Typography, useTheme } from '@mui/material';
import Menu from './menu';
export default function Sidebar() {
    const theme = useTheme();
    return (
        <Box p={2}>
            <BrandName />
            <Menu />
        </Box>
    );
}
