import * as yup from 'yup';
const createBillSchema = yup
    .object({
        customerName: yup
            .string()
            .required('Customer name is required')
            .max(100, 'Maximum 100 character')
            .min(4, 'Minimum 4 characters'),
        customerMobile: yup.string().required('Customer mobile is required').length(10),
        customerAddress: yup.string().required('Address is required').max(100, 'Maximum 100 characters'),
        seedItems: yup.array().of(
            yup.object().shape({
                seedId: yup.string().required('Seed item is required'),
                quantity: yup
                    .string()
                    .matches(/^\d+(\.\d{1,2})?$/, 'Enter valid quantity')
                    .required('Quantity is required'),
                pricePerKg: yup
                    .string()
                    .matches(/^\d+(\.\d{1,2})?$/, 'Enter valid price')
                    .required('Price is required'),
            })
        ),
        expenses: yup.array().of(
            yup.object().shape({
                expenseId: yup.string().required('Expense category is required'),
                amount: yup
                    .string()
                    .matches(/^\d+(\.\d{1,2})?$/, 'Enter valid amount')
                    .required('Amount is required'),
            })
        ),
    })
    .required();
export default createBillSchema;

export const defaultValues = {
    customerMobile: '9090909090',
    customerName: 'Test',
    customerAddress: 'test',
    seedItems: [
        {
            seedId: '1',
            quantity: '190',
            pricePerKg: '10',
        },
    ],
    expenses: [
        {
            expenseId: '3',
            amount: '10',
        },
    ],
};
