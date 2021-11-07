import { useForm } from 'react-hook-form';
import FormGroup from '../../../../sharable/form-group';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import InputController from '../../../../sharable/input-controller';
import { useCreateExpenseMutation } from '../../../../app/features/expenses-items';
interface IExpenseFormState {
    expense: string;
}
export default function CreateExpenseForm() {
    const { handleSubmit, control, formState, reset } = useForm({ defaultValues: { expense: '' } });
    const { errors } = formState;
    const [createExpenseCategory, { isLoading }] = useCreateExpenseMutation();
    const onSubmit = async (data: IExpenseFormState) => {
        try {
            await createExpenseCategory(data).unwrap();
            reset();
        } catch (err) {}
    };

    return (
        <Card variant="outlined">
            <CardHeader title="Add new expense category" />
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <InputController
                            label="Expense category"
                            required
                            control={control}
                            name="expense"
                            type="text"
                            error={!!errors.expense}
                            helperText={errors.expense?.message}
                            inputProps={{ maxLength: 100 }}
                            id="expense"
                        />
                    </FormGroup>
                    <Button disabled={isLoading} type="submit" variant="contained" color="primary">
                        {isLoading ? 'Adding...' : 'Add'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
