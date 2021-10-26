import { Container, Box, Typography, Button, Link, Icon } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import InputController from '../../sharable/input-controller';
import FormGroup from '../../sharable/form-group';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import verifyEmailSignup from './verify-email.schema';
import { Link as ReactRouter } from 'react-router-dom';
import { ArrowLeftSharp } from '@mui/icons-material';
import useCountDown from '../../hooks/timer';
import IVerifySignupEmailInterface from '../../types/verify-email/verify-email.types';
import useAppSelector from '../../hooks/useAppSelector';
export default function VerifySignupEmail() {
    const { control, handleSubmit, formState, setError, clearErrors } = useForm<IVerifySignupEmailInterface>({
        resolver: yupResolver(verifyEmailSignup), // validate
        defaultValues: { otp: '' },
    });
    const { timer, hasStopped } = useCountDown({ duration: 120 });
    const signUpData = useAppSelector((state) => state.signupPayload);
    console.log(signUpData);
    const onSubmit = (data: IVerifySignupEmailInterface) => {
        console.log(data);
    };
    return (
        <Container maxWidth="xs" sx={{ paddingTop: 6 }}>
            <Box>
                <Button startIcon={<ArrowLeftSharp />} component={ReactRouter} to="/sign-up">
                    Go back
                </Button>
                <Typography variant="h5" data-testid="brandname-text" textAlign="center" my={7}>
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
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button disableElevation fullWidth type="submit" variant="contained" color="primary">
                            Verify email
                        </Button>
                    </FormGroup>
                    <Typography my={4}>
                        Didn't received code, {hasStopped ? <Button>Resend</Button> : `resend in ${timer} seconds`}
                    </Typography>
                </form>
            </Box>
        </Container>
    );
}
