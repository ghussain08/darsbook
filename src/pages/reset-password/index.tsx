import { Container, Box, Typography, Button, CircularProgress } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import FormGroup from "../../sharable/form-group";
import Input from "../../sharable/input";
import request from "../../utils/request";
import PasswordResetEmail from "./email";
import PasswordForm from "./password-form";
export default function VerifySignupEmail() {
    const [formData, setFormData] = useState({ email: "", otp: "", password1: "", password2: "" });

    const [otpSent, setOTPSent] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const obj: any = { ...formData };
        obj[name] = value;
        setFormData(obj);
    };

    return (
        <Container maxWidth="xs" sx={{ paddingTop: 6 }}>
            <Box>
                <Typography variant="h5" textAlign="center" my={5}>
                    Enter your registered Email Address
                </Typography>
                <Typography mb={3}>
                    We will send you an OTP to reset your password. Do not share OTP with anyone else.
                </Typography>
                <form>
                    <PasswordResetEmail
                        setOTPSent={setOTPSent}
                        value={formData.email}
                        onChange={handleChange}
                        otpSent={otpSent}
                    />
                    {otpSent && <PasswordForm formData={formData} onChange={handleChange} />}
                </form>
            </Box>
        </Container>
    );
}
