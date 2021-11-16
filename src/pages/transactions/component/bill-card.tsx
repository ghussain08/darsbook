import React from "react";
import { Box, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Chip, Divider } from "@mui/material";
import { IBillTransaction } from "../../../types/new-bill/new-bill.types";
import BillCardDetails from "./bill-card-details";

export default function BillCard(props: { bill: IBillTransaction }) {
    const { bill } = props;
    return (
        <Accordion variant="outlined" sx={{ mb: 2, border: "1px solid #ccc", borderRadius: "5px" }}>
            <AccordionSummary>
                <Box width={"100%"}>
                    <Box display={"flex"} flexDirection={{ xs: "column", sm: "row" }} alignItems={"flex-start"} mb={2}>
                        <Typography variant="body2">{new Date(bill.createdOn).toLocaleString("en-IN")}</Typography>
                        <Typography
                            mx={{ xs: 0, sm: 3 }}
                            variant="body2"
                        >{`Bill No: ${bill.displayOrderId}`}</Typography>
                    </Box>
                    <Grid container spacing={2} alignItems={"center"}>
                        <Grid item xs={12} md={2}>
                            <Typography>
                                <strong>{bill.customer}</strong>
                            </Typography>
                            <Typography>{bill.customerMobile}</Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography gutterBottom variant="body2">
                                Address
                            </Typography>
                            <Typography>{bill.address}</Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography gutterBottom variant="body2">
                                Amount
                            </Typography>
                            <Typography>{bill.totalAmount} INR</Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography gutterBottom variant="body2">
                                Expense
                            </Typography>
                            <Typography>{bill.totalExpense || 0} INR</Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Typography variant="h6" textAlign={{ xs: "initial", md: "right" }}>
                                <strong>{bill.finalAmount} INR</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <Chip label={bill.orderType} color={bill.orderType === "buy" ? "success" : "error"} />
                        </Grid>
                    </Grid>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <BillCardDetails bill={bill} />
            </AccordionDetails>
        </Accordion>
    );
}
