import { CircularProgress, Box, Typography } from "@mui/material";
import React from "react";
export default function Loader(props: { size?: number; thickness?: number; isOpen: boolean; message?: string }) {
    if (!props.isOpen) {
        return null;
    }

    return (
        <Box display={"flex"} flexDirection={{ xs: "column", md: "row" }}>
            <Typography sx={{ mr: 2 }}>{props.message || "Please wait..."}</Typography>
            <CircularProgress size={props.size || "20px"} thickness={props.thickness || 5} />
        </Box>
    );
}
