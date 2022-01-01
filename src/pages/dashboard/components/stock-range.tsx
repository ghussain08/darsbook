import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { Box, Grid, TextField, Button } from "@mui/material";
import React from "react";
import day from "dayjs";
import { stockFilters } from "../../../app/features/stocks";
interface StockRangeProps {
    applyDateFilters: (filters: stockFilters) => void;
}
export default function StockRange(props: StockRangeProps) {
    const [dateFrom, setDateFrom] = React.useState<Date | null>(null);
    const [dateTo, setDateTo] = React.useState<Date | null>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.applyDateFilters({
            dateFrom: dateFrom ? day(dateFrom).format("YYYY-MM-DD hh:mm:ss") : null,
            dateTo: dateTo ? day(dateTo).format("YYYY-MM-DD hh:mm:ss") : null,
        });
    };
    return (
        <Box p={2} bgcolor={"white"} my={1}>
            <form onSubmit={handleSubmit} action="">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={2}>
                        <MobileDatePicker
                            label="Stock details from"
                            inputFormat="DD/MM/YYYY"
                            value={dateFrom}
                            clearable
                            onChange={(e) => setDateFrom(e)}
                            renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} md={2}>
                        <MobileDatePicker
                            label="History upto"
                            inputFormat="DD/MM/YYYY"
                            value={dateTo}
                            clearable
                            onChange={(e) => setDateTo(e)}
                            renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} md={2}>
                        <Button type="submit" variant="contained" color="secondary">
                            Apply
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
