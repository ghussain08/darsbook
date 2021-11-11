export interface INewBillFormValues {
    orderType: "sell" | "buy";
    customerName: string;
    customerAddress: string;
    customerMobile: string;
    seedItems: Array<{ seedId: string; quantity: string; pricePerKg: string }>;
    expenses: Array<{ expenseId: string; amount: string }>;
    remark: string;
}
