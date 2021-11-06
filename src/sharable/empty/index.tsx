import { Typography, Box, useTheme } from '@mui/material';
import { ReportGmailerrorred } from '@mui/icons-material';
// create a component to show no data found message
const Empty = (props: { message?: string; isOpen: boolean }) => {
    const theme = useTheme();
    if (!props.isOpen) return null;
    return (
        <Box display="flex" color={theme.palette.error.main}>
            <ReportGmailerrorred />
            <Typography>{props.message || 'No data found'}</Typography>
        </Box>
    );
};

export default Empty;
