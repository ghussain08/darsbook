import { useForm } from 'react-hook-form';
import FormGroup from '../../../../sharable/form-group';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import InputController from '../../../../sharable/input-controller';
import { useCreateSeedMutation } from '../../../../app/features/seeds';
interface ISeedFormState {
    seedName: string;
}
export default function CreateSeedForm() {
    const { handleSubmit, control, formState, reset } = useForm({ defaultValues: { seedName: '' } });
    const { errors } = formState;
    const [createSeed, { isLoading }] = useCreateSeedMutation();
    const onSubmit = async (data: ISeedFormState) => {
        try {
            await createSeed(data).unwrap();
            reset();
        } catch (err) {}
    };

    return (
        <Card variant="outlined">
            <CardHeader title="Add new seed" subheader="Add New Seed" />
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <InputController
                            label="Seed Name"
                            required
                            control={control}
                            name="seedName"
                            type="text"
                            error={!!errors.seedName}
                            helperText={errors.seedName?.message}
                            inputProps={{ maxLength: 100 }}
                            id="seedName"
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
