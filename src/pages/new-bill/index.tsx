import { useState } from 'react';
import PageContainer from '../../sharable/page-container';
import CustomerInfo from './components/customer-info';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Box, Paper, Divider } from '@mui/material';
import createBillSchema, { defaultValues } from './form-utils';
import SeedItems from './components/seed-items';
import { yupResolver } from '@hookform/resolvers/yup';
import ExpenseItems from './components/expense-items';
import { INewBillFormValues } from '../../types/new-bill/new-bill.types';
import TotalBillAmount from './components/total-bill-amount';
import BillPreview from './components/bill-preview';

export default function NewBill() {
    const [preview, togglePreview] = useState(false);
    const { control, handleSubmit, getValues, watch } = useForm<INewBillFormValues>({
        defaultValues,
        resolver: yupResolver(createBillSchema),
    });

    watch('seedItems');
    watch('expenses');

    const onSubmit: SubmitHandler<INewBillFormValues> = (data) => {
        if (preview === false) {
            togglePreview(true);
            return;
        }
        togglePreview(false);
        console.log('submitting');
    };

    console.log(getValues());

    return (
        <PageContainer pageTitle="New Bill">
            <Box component={Paper} py={3} px={{ lg: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CustomerInfo control={control} />
                    <Divider />
                    <SeedItems getValues={getValues} control={control} />
                    <Divider />
                    <ExpenseItems control={control} />
                    <Divider />
                    <TotalBillAmount getValues={getValues} />
                    <Divider />

                    <Box textAlign={'center'} mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Create Bill
                        </Button>
                    </Box>
                    {preview && (
                        <BillPreview
                            getValues={getValues}
                            onCancel={() => togglePreview(false)}
                            onConfirm={handleSubmit(onSubmit)}
                        />
                    )}
                </form>
            </Box>
        </PageContainer>
    );
}
