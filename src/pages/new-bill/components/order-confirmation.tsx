import { Dialog, DialogContent, Typography, Box, Icon, Button, Slide } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { SlideProps } from "@mui/material/Slide";
import React from "react";
const Transition = React.forwardRef<
    unknown,
    SlideProps & {
        children?: React.ReactElement;
    }
>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function OrderConfirmation(props: { orderId: number; onClose: () => void; open: boolean }) {
    return (
        <Dialog TransitionComponent={Transition} open={props.open} onClose={props.onClose} title="Bill Preview">
            <DialogContent>
                <Box my={3} textAlign={"center"}>
                    <Icon color="success" sx={{ fontSize: "5rem", height: "100px", width: "100px" }}>
                        <CheckCircle sx={{ fontSize: "5rem" }} />
                    </Icon>
                </Box>
                <Typography textAlign={"center"} variant="h6" color="textPrimary">
                    Bill has been created. Your bill ID is {props.orderId}
                </Typography>
                <Box my={2} textAlign={"center"}>
                    <Button onClick={props.onClose} color="primary" disableElevation variant="contained">
                        Ok
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
