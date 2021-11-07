import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../utils/request';
export interface IExpense {
    expense: string;
    userId: string;
    isActive: boolean;
    createdOn: string;
    updatedOn: string;
    expenseId: number;
}
export const expenseApi = createApi({
    reducerPath: 'expenses',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['ExpenseList'],
    endpoints: (builder) => {
        return {
            createExpense: builder.mutation<void, { expense: string }>({
                query: (data) => {
                    return {
                        method: 'POST',
                        data: data,
                        url: `/api/private/v1/expenses`,
                    };
                },
                invalidatesTags: (result, error, id) => {
                    return error ? [] : ['ExpenseList'];
                },
            }),
            removeExpenseItem: builder.mutation<void, { id: number; status: 0 | 1 }>({
                query: (data) => {
                    return {
                        method: 'PUT',
                        data: data,
                        url: `/api/private/v1/expenses`,
                    };
                },
                invalidatesTags: (result, error, id) => {
                    return error ? [] : ['ExpenseList'];
                },
            }),
            getUserExpenseItem: builder.query<{ expenses: Array<IExpense> }, void>({
                query: () => {
                    return { url: `/api/private/v1/expenses` };
                },
                providesTags: ['ExpenseList'],
            }),
        };
    },
});

export const {
    useGetUserExpenseItemQuery,
    reducer,
    reducerPath,
    useCreateExpenseMutation,
    useRemoveExpenseItemMutation,
} = expenseApi;
