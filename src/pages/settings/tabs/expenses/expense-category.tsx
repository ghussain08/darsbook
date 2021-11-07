import React from 'react';
import { ListItemText, ListItem, Button, CircularProgress } from '@mui/material';
import ConfirmationDialog from '../../../../sharable/confirmation';
import { IExpense, useRemoveExpenseItemMutation } from '../../../../app/features/expenses-items';
export default function ExpenseCategory(props: { expense: IExpense }) {
    const [updateExpenseCategory, { isLoading }] = useRemoveExpenseItemMutation();

    const [isOpen, setIsOpen] = React.useState(false);
    const { expense } = props;
    const updateExpenseHandler = async () => {
        try {
            setIsOpen(false);
            await updateExpenseCategory({ id: expense.expenseId, status: expense.isActive ? 0 : 1 });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <React.Fragment>
            <ConfirmationDialog
                open={isOpen}
                title="Remove expense category"
                content="Are you sure you want to disable this expense category?"
                onConfirm={updateExpenseHandler}
                onCancel={() => setIsOpen(false)}
            />

            <ListItem disableGutters>
                <ListItemText
                    primary={`${expense.expense} ${!expense.isActive ? `(Inactive)` : ''}`}
                    secondary={new Date(expense.createdOn).toLocaleString()}
                />
                <Button
                    disabled={isLoading}
                    endIcon={isLoading ? <CircularProgress size={20} /> : null}
                    onClick={() => setIsOpen(true)}
                    color={expense.isActive ? 'error' : 'success'}
                >
                    {expense.isActive ? 'Disable' : 'Enable'}
                </Button>
            </ListItem>
        </React.Fragment>
    );
}
