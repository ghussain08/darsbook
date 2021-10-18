import React, { ReactNode } from 'react';
import { Container, Box, Typography, Button, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputController from '../../sharable/input-controller';
import FormGroup from '../../sharable/form-group';
import { Link as ReactRouter } from 'react-router-dom';
import loginSchema from './form.schema';
import settings from '../../config';
export default function Login(): ReactNode {
    const { register, control, handleSubmit, formState } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });
    const onSubmit = (data: any) => {
        console.log('called');
        console.log(data);
    };
    return (
        <Container maxWidth="xs" sx={{ paddingTop: 8 }}>
            <Box>
                <Typography
                    textAlign="center"
                    variant="h4"
                    fontWeight="500"
                    mb={7}
                >
                    {settings.brandName}
                </Typography>
                <Typography variant="h6" fontWeight="light" mb={4}>
                    Login to access your account
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <FormGroup>
                        <InputController
                            autoComplete="email"
                            control={control}
                            label="Email"
                            name="email"
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <InputController
                            autoComplete="password"
                            control={control}
                            label="Password"
                            name="password"
                            type="password"
                            required
                        />
                    </FormGroup>
                    <Typography my={3} variant="body2">
                        <Link component={ReactRouter} to="/password-reset">
                            Forgot password?
                        </Link>
                    </Typography>
                    <Button
                        size="large"
                        fullWidth
                        type="submit"
                        variant="contained"
                        disableElevation
                    >
                        Login
                    </Button>
                </form>
                <Typography textAlign="center" my={5}>
                    Already created?{' '}
                    <Link component={ReactRouter} to="/sign-up">
                        Login Here
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}
