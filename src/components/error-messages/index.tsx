import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { Box } from '@mui/system';
import { FieldError } from 'react-hook-form';

export default function ErrorMessages(props: { error: FieldError | undefined }) {
    if (!props.error) {
        return null;
    }
    return (
        <Box my={3}>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {props.error.message}
            </Alert>
        </Box>
    );
}
