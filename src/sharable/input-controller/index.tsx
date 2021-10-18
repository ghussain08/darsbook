import { OutlinedTextFieldProps, TextFieldProps } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import Input from '../input';
type inputController = Omit<OutlinedTextFieldProps, 'variant'>;
export interface IControllerProps extends inputController {
    control: any;
    name: string;
}
export default function InputController(props: IControllerProps) {
    const { control, name, ...rest } = props;
    return (
        <Controller
            control={control}
            name={name}
            render={(properties) => {
                const { field, fieldState } = properties;
                return (
                    <Input
                        sx={{ backgroundColor: 'white' }}
                        variant="outlined"
                        size="small"
                        aria-required={props.required}
                        aria-invalid={!!fieldState.error}
                        aria-errormessage={
                            fieldState.error ? fieldState.error.message : ''
                        }
                        {...field}
                        error={!!fieldState.error}
                        helperText={
                            fieldState.error ? fieldState.error.message : null
                        }
                        {...rest}
                    />
                );
            }}
        />
    );
}
