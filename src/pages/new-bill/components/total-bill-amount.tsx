import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { INewBillFormValues } from '../../../types/new-bill/new-bill.types';

interface ITotalBillAmountProps {
    getValues: () => INewBillFormValues;
}

export default function TotalBillAmount(props: ITotalBillAmountProps) {
    const totalAmount = getTotalSeedAmount(props.getValues());
    const totalExpense = getTotalExpenseAmount(props.getValues());
    return (
        <Box p={2} width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
            <Typography paragraph>Total Bill: {totalAmount.toFixed(2)} INR</Typography>
            <Typography paragraph>Total Expense: {totalExpense.toFixed(2)} INR</Typography>
            <Divider />
            <Typography fontWeight={'bold'} paragraph>
                Final Bill Amount: {(totalAmount - totalExpense).toFixed(2)} INR
            </Typography>
        </Box>
    );
}

function getTotalSeedAmount(values: INewBillFormValues) {
    let total = 0;
    values.seedItems.forEach((seedItem) => {
        if (seedItem.pricePerKg && seedItem.quantity) {
            total += parseFloat(seedItem.pricePerKg) * parseFloat(seedItem.quantity);
        }
    });
    return total;
}

function getTotalExpenseAmount(values: INewBillFormValues) {
    let total = 0;
    values.expenses.forEach((expenseItem) => {
        if (expenseItem.amount) {
            total += parseFloat(expenseItem.amount);
        }
    });
    return total;
}
