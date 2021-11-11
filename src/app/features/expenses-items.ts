import coreQuery from "../../utils/core-rtk-query";
export interface IExpense {
    expense: string;
    userId: string;
    isActive: boolean;
    createdOn: string;
    updatedOn: string;
    expenseId: number;
}
export const expenseApi = coreQuery
    .injectEndpoints({
        endpoints: (builder) => {
            return {
                createExpense: builder.mutation<void, { expense: string }>({
                    query: (data) => {
                        return {
                            method: "POST",
                            data: data,
                            url: `/api/private/v1/expenses`,
                        };
                    },
                }),
                removeExpenseItem: builder.mutation<void, { id: number; status: 0 | 1 }>({
                    query: (data) => {
                        return {
                            method: "PUT",
                            data: data,
                            url: `/api/private/v1/expenses`,
                        };
                    },
                }),
                getUserExpenseItem: builder.query<{ expenses: Array<IExpense> }, void>({
                    query: () => {
                        return { url: `/api/private/v1/expenses` };
                    },
                }),
            };
        },
    })
    .enhanceEndpoints({
        addTagTypes: ["ExpenseList"],
        endpoints: {
            createExpense: {
                invalidatesTags: (result, error, id) => {
                    return error ? [] : ["ExpenseList"];
                },
            },
            removeExpenseItem: {
                invalidatesTags: (result, error, id) => {
                    return error ? [] : ["ExpenseList"];
                },
            },
            getUserExpenseItem: {
                providesTags: ["ExpenseList"],
            },
        },
    });

export const {
    useGetUserExpenseItemQuery,
    reducer,
    reducerPath,
    useCreateExpenseMutation,
    useRemoveExpenseItemMutation,
} = expenseApi;
