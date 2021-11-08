import { axiosBaseQuery } from '../../utils/request';
import { createApi } from '@reduxjs/toolkit/query/react';
import { INewBillFormValues } from '../../types/new-bill/new-bill.types';

export const billApi = createApi({
    reducerPath: 'bill',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Bills'],
    endpoints: (builder) => {
        return {
            createBill: builder.mutation<{ customerId: number; orderId: number }, INewBillFormValues>({
                query: (data) => {
                    return {
                        method: 'POST',
                        url: '/api/private/v1/bill',
                        data,
                    };
                },
                invalidatesTags: ['Bills'],
            }),
        };
    },
});
export const { useCreateBillMutation, reducer, reducerPath } = billApi;
