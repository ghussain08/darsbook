import { AddBox, DeleteForever } from "@mui/icons-material";
import { Button, FormGroup, Grid, Typography, Box } from "@mui/material";
import React from "react";
import { useFieldArray } from "react-hook-form";
import ExpenseDropdown from "../../../sharable/expense-dropdown";
import InputController from "../../../sharable/input-controller";
import { Control } from "react-hook-form";
import { INewBillFormValues } from "../../../types/new-bill/new-bill.types";
interface IExpenseItemsProps {
    control: Control<INewBillFormValues>;
}
export default function ExpenseItems(props: IExpenseItemsProps) {
    const { fields, append, remove } = useFieldArray({
        control: props.control,
        name: "expenses",
    });
    return (
        <Box p={2}>
            <Typography variant="h6">Additional Expenses</Typography>
            <Grid sx={{ mt: 0 }} container spacing={2} data-testid="expense-items">
                {fields.map((expenseItem: any, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Grid item xs={12} sm={3} md={4}>
                                <FormGroup>
                                    <ExpenseDropdown
                                        required
                                        select
                                        label="Expense Category"
                                        control={props.control}
                                        id={`expense-category-${index}`}
                                        name={`expenses.${index}.expenseId`}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={3} md={4}>
                                <FormGroup>
                                    <InputController
                                        type="number"
                                        required
                                        inputProps={{ min: 0, "data-testid": `expenses.${index}.amount` }}
                                        label="Amount"
                                        id={`expense-amount-${index}`}
                                        control={props.control}
                                        name={`expenses.${index}.amount`}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={3} md={4} key={index} alignItems="center">
                                <FormGroup sx={{ alignItems: "flex-end" }}>
                                    <Button
                                        fullWidth={false}
                                        endIcon={<DeleteForever />}
                                        variant="outlined"
                                        onClick={() => remove(index)}
                                        color="error"
                                        data-testid="remove-expense-item"
                                    >
                                        remove
                                    </Button>
                                </FormGroup>
                            </Grid>
                        </React.Fragment>
                    );
                })}
            </Grid>
            <Box mt={4}>
                <Button
                    onClick={() => append({ expenseId: "", amount: "" })}
                    color="primary"
                    variant="outlined"
                    endIcon={<AddBox />}
                >
                    Add Expense{" "}
                </Button>
            </Box>
        </Box>
    );
}
