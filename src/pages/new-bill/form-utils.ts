import * as yup from "yup";
import { INewBillFormValues } from "../../types/new-bill/new-bill.types";
const createBillSchema = yup
    .object({
        orderType: yup.string().required("Order Type is required"),
        customerName: yup
            .string()
            .required("Customer name is required")
            .max(100, "Maximum 100 character")
            .min(4, "Minimum 4 characters"),
        customerMobile: yup.string().required("Customer mobile is required").length(10),
        customerAddress: yup.string().required("Address is required").max(100, "Maximum 100 characters"),
        seedItems: yup.array().of(
            yup.object().shape({
                seedId: yup.string().required("Seed item is required"),
                quantity: yup
                    .string()
                    .matches(/^\d+(\.\d{1,2})?$/, "Enter valid quantity")
                    .required("Quantity is required"),
                pricePerKg: yup
                    .string()
                    .matches(/^\d+(\.\d{1,2})?$/, "Enter valid price")
                    .required("Price is required"),
            })
        ),
        expenses: yup.array().of(
            yup.object().shape({
                expenseId: yup.string().required("Expense category is required"),
                amount: yup
                    .string()
                    .matches(/^\d+(\.\d{1,2})?$/, "Enter valid amount")
                    .required("Amount is required"),
            })
        ),
    })
    .required();
export default createBillSchema;

export const defaultValues: INewBillFormValues = {
    orderType: "buy",
    customerMobile: "",
    customerName: "",
    customerAddress: "",
    seedItems: [
        {
            seedId: "",
            quantity: "",
            pricePerKg: "",
        },
    ],
    expenses: [
        {
            expenseId: "",
            amount: "",
        },
    ],
};
