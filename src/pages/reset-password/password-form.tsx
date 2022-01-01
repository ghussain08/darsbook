import { Box, Button, FormHelperText, CircularProgress } from "@mui/material";
import cogoToast from "cogo-toast";
import FormGroup from "../../sharable/form-group";
import Input from "../../sharable/input";
import { useState } from "react";
import request from "../../utils/request";

// react function component for email input
export default function PasswordForm(props: any) {
    const { password1, password2, otp } = props.formData;
    const [loading, setLoading] = useState(false);
    const resetPassword = async () => {
        const { password1, password2 } = props.formData;
        if (password1.trim().length < 8) {
            cogoToast.error("Password must be atleast 8 characters");
            return;
        }
        if (password1 !== password2) {
            cogoToast.error("Passwords do not match");
            return;
        }
        if (otp.trim().length === 0) {
            cogoToast.error("Please enter OTP");
            return;
        }
        setLoading(true);
        try {
            await request({ method: "PUT", url: "/api/public/v1/reset-password", data: { ...props.formData } });
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } catch (err) {
            setLoading(false);
        }
    };
    return (
        <Box>
            <FormGroup>
                <Input
                    value={props.formData.otp}
                    onChange={props.onChange}
                    name="otp"
                    label="Enter OTP"
                    required
                    inputProps={{ maxLength: 100 }}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    type="password"
                    value={props.formData.password1}
                    onChange={props.onChange}
                    name="password1"
                    label="New Password"
                    required
                    inputProps={{ minLength: 8, maxLength: 100 }}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    type="password"
                    value={props.formData.password2}
                    onChange={props.onChange}
                    name="password2"
                    label="Confirm New Password"
                    required
                    inputProps={{ minLength: 8, maxLength: 100 }}
                />
                {password1 && password2 && password1 !== password2 && (
                    <FormHelperText error>Passwords do not match</FormHelperText>
                )}
                {password1 && password2 && password1 === password2 && (
                    <FormHelperText sx={{ color: "green" }}>Passwords matched</FormHelperText>
                )}
            </FormGroup>
            <FormGroup>
                <Button
                    onClick={resetPassword}
                    disabled={loading}
                    disableElevation
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={loading ? <CircularProgress size={20} /> : null}
                >
                    Reset Password
                </Button>
            </FormGroup>
        </Box>
    );
}
