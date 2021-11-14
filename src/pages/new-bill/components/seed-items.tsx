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
            <Typography variant="h6">Seed Items</Typography>
            <Grid sx={{ mb: 1, mt: 0.5 }} container spacing={2} rowSpacing={2} data-testid="seed-items">
                {fields.map((seedItem: any, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Grid item xs={12} sm={3} md={3}>
                                <FormGroup>
                                    <SeedDropdown
                                        required
                                        label="Item"
                                        id={`seedItem-${index}`}
                                        control={props.control}
                                        name={`seedItems.${index}.seedId`}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={3} md={3}>
                                <FormGroup>
                                    <InputController
                                        required
                                        type="number"
                                        id={`seedItems-${index}`}
                                        inputProps={{
                                            min: 0,
                                            step: 0.01,
                                            "data-testid": `seedItems.${index}.quantity`,
                                        }}
                                        label="Weight(in kgs)"
                                        control={props.control}
                                        name={`seedItems.${index}.quantity`}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <FormGroup>
                                    <InputController
                                        required
                                        inputProps={{
                                            min: 0,
                                            step: 0.01,
                                            "data-testid": `seedItems.${index}.pricePerKg`,
                                        }}
                                        type="number"
                                        id={`pricePerKg-${index}`}
                                        label="Price per kg"
                                        control={props.control}
                                        name={`seedItems.${index}.pricePerKg`}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={3} md={2} alignSelf={"center"}>
                                <FormGroup>
                                    <Typography data-testid={`seedTotal.${index}`}>
                                        Total: {getTotal(values, index)}
                                    </Typography>
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
                                            data-testid={`remove-seed-item`}
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
            <Typography paragraph color="error">
                At least 1 seed item is required
            </Typography>
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
    if (item.pricePerKg && item.quantity) {
        return (parseFloat(item.pricePerKg) * parseFloat(item.quantity)).toFixed(2);
    }
    return "";
}
