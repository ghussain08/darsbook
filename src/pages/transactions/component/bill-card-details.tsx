import React from "react";
import {
    Box,
    Typography,
    Divider,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Grid,
} from "@mui/material";
import { IBillTransaction } from "../../../types/new-bill/new-bill.types";

export default function BillCardDetails(props: { bill: IBillTransaction }) {
    const { expenses, items } = props.bill;
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Bill Items
            </Typography>
            <TableContainer sx={{ mb: 1 }} component={Paper} variant="outlined">
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.item}</TableCell>
                                <TableCell>{item.quantity} Kgs</TableCell>
                                <TableCell>{item.pricePerKg} INR</TableCell>
                                <TableCell>
                                    <strong>{item.total} INR</strong>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {expenses.length > 0 && (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Additional deductions
                    </Typography>
                    <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Expense</TableCell>
                                    <TableCell>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {expenses.map((expense, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{expense.expense}</TableCell>
                                        <TableCell>
                                            <strong>{expense.amount} INR</strong>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Box>
    );
}
