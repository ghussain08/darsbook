import React from 'react';
import { Box } from '@mui/material';
export default function TabPanel(props: ITabPanelProps) {
    const { children, value, index } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <Box pt={3}>{children}</Box>}
        </div>
    );
}

interface ITabPanelProps {
    children: React.ReactNode;
    value: number;
    index: number;
}
