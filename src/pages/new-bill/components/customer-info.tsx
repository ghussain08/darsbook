import React from 'react';
import InputController from '../../../sharable/input-controller';
import FormGroup from '../../../sharable/form-group';
import { Box, Typography, Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { INewBillFormValues } from '../../../types/new-bill/new-bill.types';
interface ICustomerInfoProps {
    control: Control<INewBillFormValues>;
}
export default function CustomerInfo(props: ICustomerInfoProps) {
    const { control } = props;
    return (
        <Box p={2}>
            <Typography variant="h6" fontWeight={'500'}>
                Customer Information
            </Typography>
            <Grid sx={{ mt: 2 }} container columnSpacing={2} rowSpacing={2}>
                <Grid item xs={12} md={6}>
                    <FormGroup>
                        <InputController
                            control={control}
                            name="customerMobile"
                            label="Mobile Number"
                            id="customerMobile"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormGroup>
                        <InputController control={control} name="customerName" label="Full name" id="customerName" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormGroup>
                        <InputController
                            multiline
                            rows={3}
                            control={control}
                            name="customerAddress"
                            label="Address"
                            id="customerAddress"
                        />
                    </FormGroup>
                </Grid>
            </Grid>
        </Box>
    );
}
