import React from 'react';
import { Box, Typography } from '@mui/material';
export default function PageContainer(props: { pageTitle: string; children: React.ReactNode }) {
    return (
        <React.Fragment>
            <Typography variant="h5">{props.pageTitle}</Typography>
            <Box mt={2}>{props.children}</Box>
        </React.Fragment>
    );
}
