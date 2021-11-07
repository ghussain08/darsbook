import InputController, { IControllerProps } from '../input-controller';
import { MenuItem, InputAdornment, CircularProgress } from '@mui/material';
import { useGetUserExpenseItemQuery } from '../../app/features/expenses-items';

export default function ExpenseDropdown(props: IControllerProps) {
    const { data, isFetching } = useGetUserExpenseItemQuery();
    const expenses = data?.expenses || [];
    return (
        <InputController
            InputProps={{
                endAdornment: isFetching ? (
                    <InputAdornment position="end">
                        <CircularProgress size={20} color="secondary" />
                    </InputAdornment>
                ) : null,
            }}
            {...props}
        >
            {expenses.map((expense) =>
                expense.isActive ? (
                    <MenuItem key={expense.expenseId} value={expense.expenseId}>
                        {expense.expense}
                    </MenuItem>
                ) : null
            )}
        </InputController>
    );
}
