import { Box, Typography, Grid, colors, Tooltip, TextField } from "@mui/material";
import { useEffect } from "react";
import { stockApi, stockFilters } from "../../../app/features/stocks";
import Loader from "../../../sharable/loader";
import StockCard from "./stock-card";
import StockRange from "./stock-range";
export default function Stocks() {
    const [trigger, result] = stockApi.useLazyGetStocksQuery();
    const { isError, isFetching, isLoading, data } = result;

    const stockCards = data?.map((stock, index) => {
        return <StockCard stock={stock} key={index} />;
    });
    useEffect(() => {
        trigger({ dateFrom: null, dateTo: null }, true);
    }, []);

    const applyDateFilters = (dateFilters: stockFilters) => {
        trigger(dateFilters, true);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Stocks
            </Typography>
            <StockRange applyDateFilters={applyDateFilters} />
            {isLoading || isFetching ? (
                <Box my={2}>
                    <Loader isOpen={isLoading || isFetching} message="Getting stock details...please wait" />
                </Box>
            ) : null}

            <Grid container spacing={2}>
                {stockCards}
            </Grid>
        </Box>
    );
}
