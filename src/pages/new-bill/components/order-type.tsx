import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, FormHelperText } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { INewBillFormValues } from "../../../types/new-bill/new-bill.types";
interface IOrderTypeProps {
    control: Control<INewBillFormValues>;
}
export default function OrderType(props: IOrderTypeProps) {
    return (
        <Box p={2}>
            <Controller
                control={props.control}
                name="orderType"
                rules={{ required: true }}
                render={({ field, fieldState }) => {
                    return (
                        <FormControl required component="fieldset">
                            <FormLabel component={"legend"}>Order Type</FormLabel>
                            <RadioGroup row {...field} aria-label="order-type">
                                <FormControlLabel value={"buy"} control={<Radio />} label="Buy" />
                                <FormControlLabel value={"sell"} control={<Radio />} label="Sell" />
                            </RadioGroup>
                            {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
                        </FormControl>
                    );
                }}
            />
        </Box>
    );
}
