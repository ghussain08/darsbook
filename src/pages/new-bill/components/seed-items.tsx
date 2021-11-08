import { AddBox, DeleteForever } from "@mui/icons-material";
import { Button, FormGroup, Grid, Typography, Box } from "@mui/material";
import React from "react";
import { useFieldArray } from "react-hook-form";
import InputController from "../../../sharable/input-controller";
import SeedDropdown from "../../../sharable/seed-dropdown";
import { Control } from "react-hook-form";
import { INewBillFormValues } from "../../../types/new-bill/new-bill.types";
interface ISeedItemsProps {
    control: Control<INewBillFormValues>;
    getValues: () => INewBillFormValues;
}
export default function SeedItems(props: ISeedItemsProps) {
    const { fields, append, remove } = useFieldArray({
        control: props.control,
        name: "seedItems",
    });
    const values = props.getValues();

    return (
        <Box p={2}>
            <Typography variant="h6" fontWeight={"500"}>
                Seed Items
            </Typography>
            <Grid sx={{ my: 2 }} container spacing={2} rowSpacing={3}>
                {fields.map((seedItem: any, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Grid item xs={12} sm={3} md={3}>
                                <FormGroup>
                                    <SeedDropdown
                                        select
                                        label="Item"
                                        control={props.control}
                                        name={`seedItems.${index}.seedId`}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={3} md={3}>
                                <FormGroup>
                                    <InputController
                                        type="number"
                                        inputProps={{ min: 0, step: 0.01 }}
                                        label="Weight(in kgs)"
                                        control={props.control}
                                        name={`seedItems.${index}.quantity`}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <FormGroup>
                                    <InputController
                                        inputProps={{ min: 0, step: 0.01 }}
                                        type="number"
                                        label="Price per kg"
                                        control={props.control}
                                        name={`seedItems.${index}.pricePerKg`}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={3} md={2} alignSelf={"center"}>
                                <FormGroup>
                                    <Typography>Total: {getTotal(values, index)}</Typography>
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={3} md={1} key={index}>
                                {fields.length > 1 && (
                                    <FormGroup>
                                        <Button
                                            endIcon={<DeleteForever />}
                                            variant="outlined"
                                            onClick={() => remove(index)}
                                            color="error"
                                        >
                                            remove
                                        </Button>
                                    </FormGroup>
                                )}
                            </Grid>
                        </React.Fragment>
                    );
                })}
            </Grid>
            {/* <Typography paragraph color="error">
                At least 1 seed item is required
            </Typography> */}
            <Box mt={4}>
                <Button
                    onClick={() => append({ quantity: "", pricePerKg: "", seedId: "" })}
                    color="primary"
                    variant="outlined"
                    endIcon={<AddBox />}
                >
                    Add Item{" "}
                </Button>
            </Box>
        </Box>
    );
}

function getTotal(data: INewBillFormValues, index: number) {
    const item = data.seedItems[index];
    console.log(item);
    if (item.pricePerKg && item.quantity) {
        return (parseFloat(item.pricePerKg) * parseFloat(item.quantity)).toFixed(2);
    }
    return "";
}
