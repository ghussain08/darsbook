import { IBillFilters, IBillTransaction, INewBillFormValues } from "../../types/new-bill/new-bill.types";
import { IListResponse } from "../../types/response/list-response.type";
import { getURL } from "../../utils/common";
import coreQuery from "../../utils/core-rtk-query";

export const billApi = coreQuery
    .injectEndpoints({
        endpoints: (builder) => {
            return {
                createBill: builder.mutation<
                    { customerId: number; orderId: number; displayOrderId: string },
                    INewBillFormValues
                >({
                    query: (data) => {
                        return {
                            method: "POST",
                            url: "/api/private/v1/bill",
                            data,
                        };
                    },
                }),
                getBills: builder.query<IListResponse<IBillTransaction>, Partial<IBillFilters>>({
                    query: (filters) => {
                        const url = getURL("/api/private/v1/bill", filters);
                        return {
                            method: "GET",
                            url,
                        };
                    },
                    transformResponse: (returnValue: IBillTransaction[], meta: any) => {
                        return {
                            data: returnValue,
                            meta,
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
export const { useCreateBillMutation, reducer, reducerPath, useGetBillsQuery } = billApi;
