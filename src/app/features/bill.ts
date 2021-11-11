import { INewBillFormValues } from "../../types/new-bill/new-bill.types";
import coreQuery from "../../utils/core-rtk-query";

export const billApi = coreQuery
    .injectEndpoints({
        endpoints: (builder) => {
            return {
                createBill: builder.mutation<{ customerId: number; orderId: number }, INewBillFormValues>({
                    query: (data) => {
                        return {
                            method: "POST",
                            url: "/api/private/v1/bill",
                            data,
                        };
                    },
                }),
            };
        },
    })
    .enhanceEndpoints({
        addTagTypes: ["Bills"],
        endpoints: {
            createBill: {
                invalidatesTags: ["Bills"],
            },
        },
    });
export const { useCreateBillMutation, reducer, reducerPath } = billApi;
