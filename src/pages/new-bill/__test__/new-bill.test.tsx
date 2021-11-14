import NewBill from "..";
import { render } from "../../../utils/test-util";
import { setupServer } from "msw/node";
import rest from "msw";
import { getByText, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Create new bill", () => {
    it("should render without crash", () => {
        render(<NewBill />);
    });
    it("should render empty values initially", async () => {
        const { getByLabelText, getByTestId, queryByTestId, getByText } = render(<NewBill />);
        // customer info section
        const mobile = getByLabelText(/Mobile Number/);
        const name = getByLabelText(/Full name/);
        const address = getByLabelText(/Address/);
        expect(mobile).toHaveValue("");
        expect(name).toHaveValue("");
        expect(address).toHaveValue("");

        // seed item section
        const item = getByLabelText(/Item/);
        const weight = getByLabelText(/Weight/);
        const price = getByLabelText(/Price/);
        expect(item.getAttribute("value")).toBeFalsy();
        expect(weight).toHaveValue(null);
        expect(price).toHaveValue(null);

        // there should be one seed item
        const seedItemContainer = getByTestId("seed-items");
        // each row has 5 elements
        expect(seedItemContainer.children.length).toBe(5);

        // remove seed button should not be visible
        const removeSeedButton = queryByTestId("remove-seed-item");
        expect(removeSeedButton).not.toBeInTheDocument();

        // expense items
        const expenseItemContainer = getByTestId("expense-items");
        expect(expenseItemContainer.children.length).toBe(0);

        // remark field

        const remark = getByLabelText(/Remark/);
        expect(remark).toHaveValue("");

        // bill total amount component
        const amountText = getByText(/Total Bill/);
        expect(amountText).toHaveTextContent("0.00");

        const expenseText = getByText(/Total Expense/);
        expect(expenseText).toHaveTextContent("0.00");

        const finalAmount = getByText(/Final Bill Amount/);
        expect(finalAmount).toHaveTextContent("0.00");

        const createBillBtn = getByText(/Create Bill/);
        expect(createBillBtn).toBeInTheDocument();
    });

    it("add and remove item button should add and remove rows of seed item", () => {
        const { getByTestId, getByText, getAllByTestId, queryAllByTestId } = render(<NewBill />);
        const addExpenseBtn = getByText(/add item/i);
        // click on add item
        userEvent.click(addExpenseBtn);
        const seedItemContainer = getByTestId("seed-items");
        // should add a new row
        expect(seedItemContainer.children.length).toBe(10);
        const visibleRemoveSeedButton = getAllByTestId("remove-seed-item");
        // should have 2 remove buttons
        expect(visibleRemoveSeedButton).toHaveLength(2);
        // remove any one row
        userEvent.click(visibleRemoveSeedButton[0]);
        expect(seedItemContainer.children.length).toBe(5);
        // remove button should not be visible for single row
        const hiddenRemoveSeedButton = queryAllByTestId("remove-seed-item");
        expect(hiddenRemoveSeedButton).toHaveLength(0);
    });

    it("add and remove expense item on button click", () => {
        const { getByTestId, getByText, getAllByTestId, queryAllByTestId } = render(<NewBill />);
        const expenseItemContainer = getByTestId("expense-items");
        expect(expenseItemContainer.children.length).toBe(0);

        const addExpenseBtn = getByText(/add expense/i);
        // click on add item
        userEvent.click(addExpenseBtn);
        // should add a new row
        expect(expenseItemContainer.children.length).toBe(3);
        const visibleRemoveExpenseButton = getAllByTestId("remove-expense-item");
        // should have 1 remove buttons
        expect(visibleRemoveExpenseButton).toHaveLength(1);
        // remove any one row
        userEvent.click(visibleRemoveExpenseButton[0]);
        expect(expenseItemContainer.children.length).toBe(0);
        // remove button should not be visible for single row
        const hiddenRemoveExpenseButton = queryAllByTestId("remove-expense-item");
        expect(hiddenRemoveExpenseButton).toHaveLength(0);
    });

    it("empty form should not be submitted", async () => {
        const { getByText, queryByText } = render(<NewBill />);
        const createBillBtn = getByText(/Create Bill/);
        await waitFor(() => userEvent.click(createBillBtn));
        const errorMessage = queryByText(/Bill preview/);
        expect(errorMessage).not.toBeInTheDocument();
    });

    it("should calculate correct total bill ", () => {
        const { getByRole, getByTestId, getByText } = render(<NewBill />);
        // add seed items
        const weight1 = getByTestId("seedItems.0.quantity");
        const pricePerKg1 = getByTestId("seedItems.0.pricePerKg");
        const total1 = getByTestId("seedTotal.0");
        const weight1Value = "10.90";
        const pricePerKg1value = "10.10";
        userEvent.type(weight1, weight1Value);
        userEvent.type(pricePerKg1, pricePerKg1value);
        expect(total1).toHaveTextContent((parseFloat(weight1Value) * parseFloat(pricePerKg1value)).toFixed(2));

        const total1Numeric = parseFloat(weight1Value) * parseFloat(pricePerKg1value);

        expect(getByText(/Total Bill/)).toHaveTextContent(total1Numeric.toFixed(2));

        // add one more seed item row
        const addSeedItemBtn = getByText(/add item/i);
        userEvent.click(addSeedItemBtn);

        const weight2 = getByTestId("seedItems.1.quantity");
        const pricePerKg2 = getByTestId("seedItems.1.pricePerKg");
        const total2 = getByTestId("seedTotal.1");
        const weight2Value = "1000000.10";
        const pricePerKg2value = "1245.23";
        userEvent.type(weight2, weight2Value);
        userEvent.type(pricePerKg2, pricePerKg2value);
        const total2Numeric = parseFloat(weight2Value) * parseFloat(pricePerKg2value);
        expect(total2).toHaveTextContent(total2Numeric.toFixed(2));

        const totalBill = total1Numeric + total2Numeric;
        expect(getByText(/Total Bill/)).toHaveTextContent(totalBill.toFixed(2));

        // add expenses
        const addExpenseBtn = getByText(/add expense/i);
        userEvent.click(addExpenseBtn);
        //expense item row
        const expenseAmount1 = getByTestId("expenses.0.amount");
        const expenseAmount1Value = "10.10";
        userEvent.type(expenseAmount1, expenseAmount1Value);

        expect(getByText(/Total Expense/)).toHaveTextContent(expenseAmount1Value);

        expect(getByText(/Final Bill Amount/)).toHaveTextContent(
            (totalBill - parseFloat(expenseAmount1Value)).toFixed(2)
        );
    });
});
