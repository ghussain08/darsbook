import { getURL } from "../../utils/common";
import coreQuery from "../../utils/core-rtk-query";
export interface IStockDetails {
    item: string;
    stock: number;
    avgPrice: number;
    buyAvgPrice: number;
    sellAvgPrice: number;
    profit: number;
    totalIncomingQuantity: number;
    totalOutgoiningQuantity: number;
    totalIncomingAmount: number;
    totalOutgoiningAmount: number;
    stockValue: number;
}
export interface stockFilters {
    dateFrom: null | string;
    dateTo: null | string;
}
export const stockApi = coreQuery
    .enhanceEndpoints({
        addTagTypes: ["Stock"],
    })
    .injectEndpoints({
        endpoints: (builder) => {
            return {
                getStocks: builder.query<IStockDetails[], stockFilters>({
                    query: (filters) => {
                        const url = getURL("/api/private/v1/bill/stocks", filters);
                        return {
                            method: "GET",
                            url,
                        };
                    },
                }),
            };
        },
    });
export const { reducer, reducerPath, useGetStocksQuery } = stockApi;
