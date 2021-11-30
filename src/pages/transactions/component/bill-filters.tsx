import React from "react";
import { Box, Grid, Typography, Button, MenuItem } from "@mui/material";
import InputController from "../../../sharable/input-controller";
import { useForm } from "react-hook-form";
import SeedDropdown from "../../../sharable/seed-dropdown";
import { IBillFilters } from "../../../types/new-bill/new-bill.types";
import { getURL } from "../../../utils/common";
import { useHistory } from "react-router-dom";
const defaultValues: IBillFilters = {
    nextCursor: null,
    customerMobile: "",
    isActive: "",
    seedId: "",
    orderType: "",
};
export default function BillFilters() {
    const history = useHistory();
    const { control, handleSubmit } = useForm({ defaultValues: { ...defaultValues } });
    const onSubmit = (data: IBillFilters) => {
        const filters: any = {};
        const filterNames = Object.keys(data) as Array<keyof typeof data>;
        filterNames.forEach((key) => {
            if (data[key]) {
                filters[key] = data[key];
            }
        });
        filters.nextCursor = null;
        history.push(`${history.location.pathname}${getURL("", filters)}`);
    };
    return (
        <Box bgcolor={"white"} px={2} py={1} borderRadius={"5px"} mb={2}>
            <Typography gutterBottom>Filters</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <InputController size="small" control={control} label="Customer mobile" name="customerMobile" />
                    </Grid>
                    {/* <Grid item xs={12} sm={3}>
                        <SeedDropdown control={control} name="seedId" label="Seed" />
                    </Grid> */}
                    <Grid item xs={12} sm={3}>
                        <InputController size="small" control={control} select label="Bill type" name="orderType">
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="sell">Sell</MenuItem>
                            <MenuItem value="buy">Buy</MenuItem>
                        </InputController>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <InputController size="small" control={control} select label="Bill Status" name="isActive">
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="0">Deleted</MenuItem>
                            <MenuItem value="1">Active</MenuItem>
                        </InputController>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button type="submit" disableElevation variant="contained" color="secondary">
                            Apply
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
