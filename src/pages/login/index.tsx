import { Container, Box, Typography, Button, Link, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputController from '../../sharable/input-controller';
import FormGroup from '../../sharable/form-group';
import { Link as ReactRouter, useHistory, Redirect } from 'react-router-dom';
import loginSchema from './form.schema';
import settings from '../../config';
import { handleLogin } from './api';
import useAppDispatch from '../../hooks/useAppDispatch';
import { setEmail } from '../../app/features/email-verification';
import { setUser } from '../../app/features/user';
export default function Login() {
    const { control, handleSubmit, formState } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });
    const token = localStorage.getItem('token');
    const dispatch = useAppDispatch();
    const history = useHistory();
    const { isSubmitting } = formState;
    if (token) {
        return <Redirect to="/" />;
    }
    const onSubmit = async (data: any) => {
        try {
            const res: any = await handleLogin(data);
            if (res.data.isVerified === 0 || res.data.isLoggedIn === 0) {
                dispatch(setEmail({ email: res.data.email }));
                history.push('/verify-email');
            } else {
                const { token, user } = res.data;
                localStorage.setItem('token', token);
                dispatch(setUser(user));
                history.push('/');
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Container maxWidth="xs" sx={{ paddingTop: 8 }}>
            <Box>
                <Typography textAlign="center" variant="h4" fontWeight="500" mb={7}>
                    {settings.brandName}
                </Typography>
                <Typography variant="h6" fontWeight="light" mb={4}>
                    Login to access your account
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <FormGroup>
                        <InputController
                            id="email"
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
                            id="password"
                        />
                    </FormGroup>
                    <Typography my={3} variant="body2">
                        <Link component={ReactRouter} to="/password-reset">
                            Forgot password?
                        </Link>
                    </Typography>
                    <Button
                        disabled={isSubmitting}
                        size="large"
                        fullWidth
                        endIcon={isSubmitting ? <CircularProgress size={20} thickness={5} /> : null}
                        type="submit"
                        variant="contained"
                        disableElevation
                    >
                        Login
                    </Button>
                </form>
                <Typography textAlign="center" my={5}>
                    New User?{' '}
                    <Link component={ReactRouter} to="/sign-up">
                        Create a new account
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}
