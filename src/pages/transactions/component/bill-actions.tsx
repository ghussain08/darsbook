import { Box, Button, CircularProgress, colors } from "@mui/material";
import { IBillTransaction } from "../../../types/new-bill/new-bill.types";
import { DeleteForeverRounded, Print } from "@mui/icons-material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ConfirmationDialog from "../../../sharable/confirmation";
import { useDeleteBillMutation } from "../../../app/features/bill";
export default function BillAction(props: { bill: IBillTransaction }) {
    const [deleteConfirm, toggleDeleteConfirm] = useState(false);
    const [deleteBill, options] = useDeleteBillMutation();
    // use url query param for next and prev pagination
    const history = useHistory();
    const url = new URLSearchParams(history.location.search);
    // if nextCursor is not available in url, then it's the first page, so set it to null
    const nextCursor = url.get("nextCursor") ? parseInt(url.get("nextCursor")!) : null;
    const confirmDelete = () => {
        toggleDeleteConfirm(false);
        deleteBill({ orderId: props.bill.orderId, nextCursor });
    };

    const toggleDeleteConfirmation = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        toggleDeleteConfirm(!deleteConfirm);
    };

    return (
        <Box
            display={"flex"}
            gap={"5px"}
            flexDirection={"row-reverse"}
            p={2}
            bgcolor={colors.grey[50]}
            borderRadius={"5px"}
        >
            {props.bill.isActive ? (
                <Button
                    onClick={toggleDeleteConfirmation}
                    endIcon={
                        options.isLoading ? (
                            <CircularProgress color="error" size="15px" thickness={5} />
                        ) : (
                            <DeleteForeverRounded />
                        )
                    }
                    color="error"
                    variant={options.isLoading ? "outlined" : "text"}
                    disableElevation
                    disabled={options.isLoading}
                >
                    {options.isLoading ? "Deleting..." : "Delete"}
                </Button>
            ) : null}
            <Button disabled endIcon={<Print />} disableElevation>
                Print
            </Button>
            <ConfirmationDialog
                title="Are you sure you want to delete this bill?"
                content="Bill might show up in records but it's data will not be used to calculate stocks, profit and loss etc."
                open={deleteConfirm}
                variant="error"
                onCancel={toggleDeleteConfirmation}
                onConfirm={confirmDelete}
            />
        </Box>
    );
}
