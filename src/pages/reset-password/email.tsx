import { Box, Button, CircularProgress } from "@mui/material";
import FormGroup from "../../sharable/form-group";
import Input from "../../sharable/input";
import cogoToast from "cogo-toast";
import { useState } from "react";
import request from "../../utils/request";

// react function component for email input
export default function PasswordResetEmail(props: any) {
    const [sendingOTP, setOTPLoader] = useState(false);
    const sendOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const email = props.value;
        if (!email || email.trim().length === 0) {
            cogoToast.error("Please enter email");
            return;
        }
        setOTPLoader(true);
        props.setOTPSent(false);
        try {
            await request({ method: "POST", url: "/api/public/v1/reset-password", data: { email } });
            setOTPLoader(false);
            props.setOTPSent(true);
        } catch (err) {
            setOTPLoader(false);
        }
    };
    return (
        <Box>
            <FormGroup>
                <Input
                    disabled={props.disabled}
                    value={props.value}
                    onChange={props.onChange}
                    name="email"
                    label="Registered Email Address"
                    required
                    inputProps={{ maxLength: 100 }}
                    type="email"
                />
            </FormGroup>
            {props.otpSent === false ? (
                <FormGroup>
                    <Button
                        disabled={sendingOTP}
                        endIcon={sendingOTP ? <CircularProgress size={20} /> : null}
                        onClick={sendOTP}
                        disableElevation
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        SEND OTP
                    </Button>
                </FormGroup>
            ) : null}
        </Box>
    );
}
