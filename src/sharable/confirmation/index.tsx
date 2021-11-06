/**
 * create a confirmation dialog component using material-ui dialog component
 * which will ask user to permission to perform some operation
 */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material';

interface IConfirmationDialogProps {
    open: boolean;
    title: string;
    content: string;
    onConfirm: () => void;
    onCancel: () => void;
}
export default function ConfirmationDialog(props: IConfirmationDialogProps) {
    const { open, onCancel, title, content, onConfirm } = props;
    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm} disableElevation color="primary" variant="contained">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
