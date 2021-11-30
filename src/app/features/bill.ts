import { IBillFilters, IBillTransaction, INewBillFormValues } from "../../types/new-bill/new-bill.types";
import { IListResponse } from "../../types/response/list-response.type";
import { getQueryParams, getURL } from "../../utils/common";
import coreQuery from "../../utils/core-rtk-query";

export const billApi = coreQuery
    .enhanceEndpoints({
        addTagTypes: ["Bills"],
        endpoints: {
            createBill: {
                invalidatesTags: ["Bills"],
            },
        },
    })
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
                    providesTags: (result) => {
                        return result
                            ? [
                                  ...result.data.map((bill) => ({ type: "Bills" as const, id: bill.orderId })),
                                  { type: "Bills", id: "List" },
                              ]
                            : [{ type: "Bills", id: "List" }];
                    },
                }),
                deleteBill: builder.mutation<{ orderId: number }, IBillFilters & { orderId: number }>({
                    query: (data) => {
                        return {
                            method: "DELETE",
                            url: `/api/private/v1/bill`,
                            data,
                        };
                    },
                    async onQueryStarted(reqData, options) {
                        const cacheKey = getQueryParams();
                        const { dispatch, queryFulfilled } = options;
                        try {
                            await queryFulfilled;
                            const patch = billApi.util.updateQueryData("getBills", cacheKey, (draft) => {
                                // find the order
                                const order = draft.data.find((order) => order.orderId === reqData.orderId);
                                // update order
                                Object.assign(order, { isActive: 0 });
                            });
                            dispatch(patch);
                        } catch (err) {
                            console.log(err);
                        }
                    },
                }),
            };
        },
    });
export const { useCreateBillMutation, reducer, reducerPath, useGetBillsQuery, useDeleteBillMutation } = billApi;
