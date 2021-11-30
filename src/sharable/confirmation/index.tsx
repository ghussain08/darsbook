/**
 * create a confirmation dialog component using material-ui dialog component
 * which will ask user to permission to perform some operation
 */
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from "@mui/material";

interface IConfirmationDialogProps {
    open: boolean;
    title: string;
    content: string;
    onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: "primary" | "success" | "inherit" | "secondary" | "error" | "info" | "warning" | undefined;
}
export default function ConfirmationDialog(props: IConfirmationDialogProps) {
    const { open, onCancel, title, content, onConfirm, variant = "primary" } = props;
    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm} disableElevation color={variant} variant="contained">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
