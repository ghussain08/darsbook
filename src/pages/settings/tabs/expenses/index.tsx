import { Grid } from '@mui/material';
import React from 'react';
import CreateExpenseForm from './create-expense';
import ExpenseCategories from './expense-categories';

export default function Expenses() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <CreateExpenseForm />
            </Grid>
            <Grid item xs={12} md={6}>
                <ExpenseCategories />
            </Grid>
        </Grid>
    );
}
