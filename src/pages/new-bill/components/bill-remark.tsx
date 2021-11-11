import React from "react";
import InputController from "../../../sharable/input-controller";
import FormGroup from "../../../sharable/form-group";
import { Box } from "@mui/material";
import { Control } from "react-hook-form";
import { INewBillFormValues } from "../../../types/new-bill/new-bill.types";
interface ICustomerInfoProps {
    control: Control<INewBillFormValues>;
}
export default function BillRemark(props: ICustomerInfoProps) {
    const { control } = props;
    return (
        <Box p={2}>
            <FormGroup>
                <InputController
                    rows={2}
                    multiline
                    control={control}
                    name="remark"
                    label="Remark(Optional)"
                    id="remark"
                />
            </FormGroup>
        </Box>
    );
}
