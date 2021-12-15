import {
    Box,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
} from "@mui/material";
import { IBillTransaction } from "../../../types/new-bill/new-bill.types";
import { colors } from "@mui/material";
import BillAction from "./bill-actions";

export default function BillCardDetails(props: { bill: IBillTransaction }) {
    const { expenses, items } = props.bill;
    return (
        <Box p={2} border="1px solid #ccc" bgcolor={colors.grey[50]} borderRadius={"5px"}>
            <BillAction bill={props.bill} />
            <Typography variant="h6" gutterBottom>
                Bill Items
            </Typography>
            <TableContainer sx={{ mb: 1 }} component={Paper} variant="outlined">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>Item</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Quantity</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Price/kg</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Total</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.item}</TableCell>
                                <TableCell>{item.quantity.toFixed(2)} Kgs</TableCell>
                                <TableCell>{item.pricePerKg.toFixed(2)} INR</TableCell>
                                <TableCell>{item.total.toFixed(2)} INR</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={2}></TableCell>
                            <TableCell>
                                <Typography variant="body2">
                                    <strong>Total</strong>
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <strong>{props.bill.totalAmount.toFixed(2)} INR</strong>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {expenses.length > 0 && (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Additional deductions
                    </Typography>
                    <TableContainer component={Paper} variant="outlined">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        {" "}
                                        <strong>Expense</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Amount</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {expenses.map((expense, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{expense.expense}</TableCell>
                                        <TableCell>{expense.amount.toFixed(2)} INR</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="body2">
                                            <strong>Total</strong>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <strong>{props.bill.totalAmount.toFixed(2)} INR</strong>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Box>
    );
}
