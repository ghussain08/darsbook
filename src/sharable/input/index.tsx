import React, { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";
const Input = forwardRef((props: TextFieldProps, ref) => {
  return (
    <TextField
      fullWidth
      color="primary"
      size="small"
      variant="outlined"
      {...props}
    />
  );
});
export default Input;
