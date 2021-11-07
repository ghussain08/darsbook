import { Typography, Alert } from '@mui/material';
// create a component to show no data found message
const Empty = (props: { message?: string; isOpen: boolean }) => {
    if (!props.isOpen) return null;
    return (
        <Alert variant="outlined" severity="info">
            <Typography>{props.message || 'No data found'}</Typography>
        </Alert>
    );
};

export default Empty;
