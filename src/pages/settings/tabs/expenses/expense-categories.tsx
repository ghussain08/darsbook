import React from 'react';
import { Card, List, CardContent, CardHeader, Alert } from '@mui/material';
import Loader from '../../../../sharable/loader';
import Empty from '../../../../sharable/empty';
import ExpenseCategory from './expense-category';
import { useGetUserExpenseItemQuery } from '../../../../app/features/expenses-items';

export default function ExpenseCategories() {
    const { data, isLoading } = useGetUserExpenseItemQuery();
    return (
        <Card variant="outlined">
            <CardHeader title="Expense Categories" subheader="" />
            <CardContent>
                <Loader isOpen={isLoading} />
                <Empty
                    isOpen={!data || data.expenses.length === 0}
                    message="Expense categories are not available, please add new expense categories"
                />
                <List sx={{ margin: 0 }}>
                    {data?.expenses.map((expense, index) => (
                        <ExpenseCategory expense={expense} key={index} />
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
