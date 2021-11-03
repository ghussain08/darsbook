/**
 * create a functional component which will render a clickable material-ui card which says "Hello admin"
 */

import React from 'react';
import { Icon, Box, Typography, Avatar } from '@mui/material';
import settings from '../../../config';
export default function AdminCard() {
    return (
        <Typography textAlign="center" variant="h4">
            {settings.brandName}
        </Typography>
    );
}
