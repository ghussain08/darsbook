import { Box, Typography, Grid, colors } from "@mui/material";
import { IStockDetails } from "../../../app/features/stocks";

export default function StockCard(props: { stock: IStockDetails }) {
    const { stock } = props;
    const { profit } = stock;
    let color = "black";
    if (profit > 0) {
        color = colors.green[600];
    } else if (profit < 0) {
        color = colors.red[600];
    }
    return (
        <Grid item xs={12} sm={4} md={4}>
            <Box bgcolor={"white"} p={3} mb={2} borderRadius={"5px"}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography fontWeight="bold" gutterBottom variant="h5">
                        {stock.item}
                    </Typography>
                    <Typography variant="h6" color={color} fontWeight={"bold"}>
                        {profit > 0 ? `+` : `-`} &#8377;{Math.abs(profit).toFixed()}
                    </Typography>
                </Box>

                <Box display={"flex"} mt={2} justifyContent={"space-between"}>
                    <Box>
                        <Typography variant="caption">Current Stock</Typography>
                        <Typography fontWeight={"bold"} variant="h6">
                            {stock.stock.toFixed(2)} KG
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption">Avg Price/Kg</Typography>
                        <Typography fontWeight={"bold"} variant="h6">
                            &#8377;{stock.avgPrice.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
                <Box display={"flex"} mt={2} justifyContent={"space-between"}>
                    <Box>
                        <Typography variant="caption">Current stock value</Typography>
                        <Typography>&#8377;{stock.stockValue.toFixed(2)} </Typography>
                    </Box>
                </Box>
                <Box display={"flex"} mt={2} justifyContent={"space-between"}>
                    <Box>
                        <Typography variant="caption">Total Buy</Typography>
                        <Typography>&#8377;{stock.totalIncomingAmount.toFixed(2)}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption">Total Sell</Typography>
                        <Typography>&#8377;{stock.totalOutgoiningAmount.toFixed(2)} </Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
}
