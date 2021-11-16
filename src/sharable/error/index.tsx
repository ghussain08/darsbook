import { Typography, Alert, Button } from "@mui/material";
const Error = (props: { message?: string; isOpen: boolean; onRetry?: any }) => {
    if (!props.isOpen) return null;
    return (
        <Alert
            severity="error"
            action={
                props.onRetry && (
                    <Button disableElevation size="small" variant="contained" color="error" onClick={props.onRetry}>
                        Retry
                    </Button>
                )
            }
        >
            <Typography>{props.message || "Unexpected error occurred, please try again"}</Typography>
        </Alert>
    );
};

export default Error;
