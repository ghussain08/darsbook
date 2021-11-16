export interface INewBillFormValues {
    orderType: "sell" | "buy";
    customerName: string;
    customerAddress: string;
    customerMobile: string;
    seedItems: Array<{ seedId: string; quantity: string; pricePerKg: string }>;
    expenses: Array<{ expenseId: string; amount: string }>;
    remark: string;
}

export interface IOrderItem {
    orderItemId: number;
    total: number;
    item: string;
    orderId: number;
    itemId: number;
    quantity: number;
    pricePerKg: number;
}

export interface IOrderExpenseItem {
    expense: string;
    expenseItemId: number;
    orderId: number;
    itemId: number;
    amount: number;
}
export interface IBillTransaction {
    customerId: number;
    totalAmount: number;
    totalExpense: number;
    orderType: "buy" | "sell";
    remark: string | null;
    displayOrderId: string;
    orderId: number;
    createdOn: string;
    updatedOn: string;
    customer: string;
    customerMobile: string;
    address: string;
    isActive: boolean;
    finalAmount: number;
    items: IOrderItem[];
    expenses: IOrderExpenseItem[];
}

export interface IBillFilters {
    nextCursor: null | number;
}
