import { useState } from "react";
import PageContainer from "../../sharable/page-container";
import CustomerInfo from "./components/customer-info";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Box, Paper, Divider } from "@mui/material";
import createBillSchema, { defaultValues } from "./form-utils";
import SeedItems from "./components/seed-items";
import { yupResolver } from "@hookform/resolvers/yup";
import ExpenseItems from "./components/expense-items";
import { INewBillFormValues } from "../../types/new-bill/new-bill.types";
import TotalBillAmount from "./components/total-bill-amount";
import BillPreview from "./components/bill-preview";
import OrderType from "./components/order-type";
import { useCreateBillMutation } from "../../app/features/bill";
import FullPageLoader from "../../sharable/fullpage-loader";
import OrderConfirmation from "./components/order-confirmation";

export default function NewBill() {
    const [preview, togglePreview] = useState(false);
    const [orderDetails, setOrderDetails] = useState<{ orderId: number } | null>(null);
    const [createBill, { isLoading }] = useCreateBillMutation();
    const { control, handleSubmit, getValues, watch, reset } = useForm<INewBillFormValues>({
        defaultValues,
        resolver: yupResolver(createBillSchema),
    });

    watch("seedItems");
    watch("expenses");

    const onSubmit: SubmitHandler<INewBillFormValues> = (data) => {
        if (preview === false) {
            togglePreview(true);
            return;
        }
        togglePreview(false);
        createBill(data)
            .unwrap()
            .then((response) => {
                setOrderDetails({ orderId: response.orderId });
                reset();
            })
            .catch((err) => {});
    };

    return (
        <PageContainer pageTitle="New Bill">
            <Box component={Paper} py={3} px={{ lg: 2 }}>
                <FullPageLoader isOpen={isLoading} message="Please wait, Generating bill..." />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <OrderType control={control} />
                    <CustomerInfo control={control} />
                    <Divider />
                    <SeedItems getValues={getValues} control={control} />
                    <Divider />
                    <ExpenseItems control={control} />
                    <Divider />
                    <TotalBillAmount getValues={getValues} />
                    <Divider />
                    <OrderConfirmation
                        open={orderDetails ? true : false}
                        orderId={orderDetails ? orderDetails.orderId : 0}
                        onClose={() => setOrderDetails(null)}
                    />
                    <Box textAlign={"center"} mt={2}>
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
