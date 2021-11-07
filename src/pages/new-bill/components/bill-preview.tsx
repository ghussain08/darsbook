import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    Box,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    Divider,
    DialogActions,
    Button,
} from '@mui/material';
import React from 'react';
import { useGetUserExpenseItemQuery } from '../../../app/features/expenses-items';
import { useGetUserSeedsQuery } from '../../../app/features/seeds';
import { INewBillFormValues } from '../../../types/new-bill/new-bill.types';
import TotalBillAmount from './total-bill-amount';
interface IBillPreviewProps {
    getValues: () => INewBillFormValues;
    onConfirm: () => void;
    onCancel: () => void;
}
export default function BillPreview(props: IBillPreviewProps) {
    const values = props.getValues();
    const { data: seedData } = useGetUserSeedsQuery();
    const { data: expenseData } = useGetUserExpenseItemQuery();
    return (
        <Dialog scroll="paper" fullWidth maxWidth="sm" open={true} onClose={props.onCancel} title="Bill Preview">
            <DialogTitle>Bill Preview</DialogTitle>

            <DialogContent>
                <Typography variant="h6">Customer</Typography>
                <Box my={2}>
                    <Typography paragraph>
                        Customer: {values.customerName} ({values.customerMobile})
                    </Typography>
                    <Typography paragraph>Address: {values.customerAddress}</Typography>
                </Box>
                <Typography variant="h6">Bill Items</Typography>
                <TableContainer sx={{ mb: 3 }} component={Paper} variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell>Weight(in kg)</TableCell>
                                <TableCell>Price (per kg)</TableCell>
                                <TableCell>Total Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {values.seedItems.map((seedItem, index: number) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            {seedData?.seeds.find((seed) => seed.seedId === +seedItem.seedId)?.seedName}
                                        </TableCell>
                                        <TableCell>{seedItem.quantity}</TableCell>
                                        <TableCell>{seedItem.pricePerKg}</TableCell>
                                        <TableCell>
                                            {(parseFloat(seedItem.pricePerKg) * parseFloat(seedItem.quantity)).toFixed(
                                                2
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {values.expenses.length > 0 ? (
                    <React.Fragment>
                        <Typography variant="h6">Expenses Items</Typography>
                        <TableContainer component={Paper} variant="outlined">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Expense Category</TableCell>
                                        <TableCell>Total Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {values.expenses.map((expenseItem, index: number) => {
                                        return (
                                            <TableRow>
                                                <TableCell>
                                                    {
                                                        expenseData?.expenses.find(
                                                            (expense) => expense.expenseId === +expenseItem.expenseId
                                                        )?.expense
                                                    }
                                                </TableCell>
                                                <TableCell>{expenseItem.amount}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </React.Fragment>
                ) : null}
                <Divider />
                <TotalBillAmount getValues={props.getValues} />
            </DialogContent>
            <DialogActions>
                <Button disableElevation color="secondary" onClick={props.onCancel} variant="contained">
                    Cancel
                </Button>
                <Button onClick={props.onConfirm} disableElevation color="primary" type="submit" variant="contained">
                    Ok, Create Bill
                </Button>
            </DialogActions>
        </Dialog>
    );
}
