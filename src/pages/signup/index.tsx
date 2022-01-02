import { Container, Box, Typography, Button, Link, CircularProgress, FormHelperText } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputController from "../../sharable/input-controller";
import FormGroup from "../../sharable/form-group";
import { Link as ReactRouter } from "react-router-dom";
import signupSchema from "./signup.schema";
import settings from "../../config";
import { ISignupPayload } from "../../types/signup/signup.types";
import { handleSignup } from "./api";
import useAppDispatch from "../../hooks/useAppDispatch";
import { Redirect, useHistory } from "react-router";

import { setEmail } from "../../app/features/email-verification";
const formDefaultValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    code: "",
};

/**
 * @description Create account/signup form. Once account has been created
 * user will be redirected to Verify email page to veify email by
 * entering an OTP sent to the registered email address.
 * @returns
 */
export default function CreateAccount() {
    const { control, handleSubmit, formState } = useForm<ISignupPayload>({
        resolver: yupResolver(signupSchema), // validate
        defaultValues: { ...formDefaultValues },
    });
    const token = localStorage.getItem("token");

    const { isSubmitting } = formState;
    const dispatch = useAppDispatch();
    const history = useHistory();
    const onSignup = async (data: ISignupPayload) => {
        try {
            await handleSignup(data);
            dispatch(setEmail({ email: data.email }));
            // redirect to verify email page
            history.push("/verify-email");
        } catch (err) {}
    };
    if (token) {
        return <Redirect to="/" />;
    }

    return (
        <Container maxWidth="xs" sx={{ paddingTop: 6 }}>
            <Box>
                <Typography data-testid="brandname-text" textAlign="center" variant="h4" fontWeight="500" mb={7}>
                    {settings.brandName}
                </Typography>
                <Typography variant="h6" fontWeight="light" mb={4}>
                    Create your free account and manage your mandi records with ease.
                </Typography>
                <form data-testid="signup-form" onSubmit={handleSubmit(onSignup)} action="">
                    <FormGroup>
                        <InputController
                            inputProps={{ "data-testid": "email-field" }}
                            autoComplete="email"
                            control={control}
                            label="Email"
                            name="email"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <InputController
                            inputProps={{ "data-testid": "password-field" }}
                            autoComplete="password"
                            control={control}
                            label="Password"
                            name="password"
                            type="password"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <InputController
                            inputProps={{ "data-testid": "firstname-field" }}
                            autoComplete="firstname"
                            control={control}
                            label="First Name"
                            name="firstName"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <InputController
                            inputProps={{ "data-testid": "lastname-field" }}
                            autoComplete="last-name"
                            control={control}
                            label="Last Name"
                            name="lastName"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormHelperText>
                            We are currently Invite Only. Please enter your invite code to signup.
                        </FormHelperText>
                        <InputController
                            required
                            inputProps={{ "data-testid": "lastname-field" }}
                            control={control}
                            label="Invite Code"
                            name="code"
                        />
                    </FormGroup>
                    <Typography data-testid="form-required-message" my={3} variant="body2" color="error">
                        * marked fields are required
                    </Typography>
                    <Typography data-testid="terms-and-condition-text" my={3} variant="body2">
                        By creating account, you agree to our{" "}
                        <Link component={ReactRouter} to="/login">
                            terms and conditions.
                        </Link>
                    </Typography>

                    <Button
                        data-testid="signup-submit-btn"
                        disabled={isSubmitting}
                        endIcon={isSubmitting ? <CircularProgress size={20} thickness={5} /> : null}
                        size="large"
                        fullWidth
                        type="submit"
                        variant="contained"
                        disableElevation
                    >
                        {isSubmitting ? "Creating..." : "Create free account"}
                    </Button>
                </form>
                <Typography data-testid="login-text" textAlign="center" my={5}>
                    Already created?{" "}
                    <Link component={ReactRouter} to="/login">
                        Login Here
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}
