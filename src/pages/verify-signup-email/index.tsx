import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';
import InputController from '../../sharable/input-controller';
import { useState } from 'react';
import FormGroup from '../../sharable/form-group';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import verifyEmailSignup from './verify-email.schema';
import { Link as ReactRouter, useHistory, Redirect } from 'react-router-dom';
import { ArrowLeftSharp } from '@mui/icons-material';
import useCountDown from '../../hooks/timer';
import IVerifyEmailPayload from '../../types/verify-email/verify-email.types';
import { resendEmailVerificationOTP, verifyEmail } from './api';
import { setUser } from '../../redux/features/user';
import { setToken } from '../../redux/features/auth';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';

export default function VerifySignupEmail() {
    const [isResending, toggleResendEmailLoader] = useState(false);
    const emailData = useAppSelector((state) => state.email);
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useAppDispatch();
    const email = emailData ? emailData.email : '';
    // setup form state and validation
    const { control, handleSubmit, formState } = useForm<IVerifyEmailPayload>({
        resolver: yupResolver(verifyEmailSignup), // validate
        defaultValues: { otp: '', email },
    });
    const { isSubmitting } = formState;

    // start retry send email otp countdown
    const { timer, hasStopped } = useCountDown({ duration: 2 });

    const history = useHistory();

    // if email is not present in redux then redirect to signup page
    if (!email) {
        return <Redirect to="/sign-up" />;
    }
    if (token) {
        return <Redirect to="/" />;
    }

    const onSubmit = async (data: IVerifyEmailPayload) => {
        try {
            const res: any = await verifyEmail(data);
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            dispatch(setUser(user));
            dispatch(setToken(token));
            history.push('/?message=onboard');
        } catch (err) {}
    };

    // handle resend otp
    const handleResendOtp = async () => {
        toggleResendEmailLoader(true);
        try {
            await resendEmailVerificationOTP({ email });
        } catch (err) {
        } finally {
            toggleResendEmailLoader(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ paddingTop: 6 }}>
            <Box>
                <Typography variant="h5" textAlign="center" my={7}>
                    Verify your email address{' '}
                </Typography>

                <Typography mb={6}>
                    We have sent a verification code to your email. Please check your email inbox and enter the code
                    below to verify your email.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <InputController
                            control={control}
                            inputProps={{ 'data-testid': 'email-field' }}
                            label="Enter email verification code"
                            name="otp"
                            id="otp"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            disabled={isSubmitting}
                            disableElevation
                            endIcon={isSubmitting ? <CircularProgress size={20} thickness={5} /> : null}
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {isSubmitting ? 'Verifying' : 'Verify email'}
                        </Button>
                    </FormGroup>
                    <Typography my={4}>
                        Didn't received code,{' '}
                        {hasStopped ? (
                            <Button onClick={handleResendOtp} disabled={isSubmitting || isResending}>
                                Resend OTP
                            </Button>
                        ) : (
                            `resend in ${timer} seconds`
                        )}
                    </Typography>
                </form>
            </Box>
        </Container>
    );
}
