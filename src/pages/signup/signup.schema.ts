import * as yup from 'yup';
const signupSchema = yup
    .object({
        email: yup.string().max(150).email().required('Email is required'),
        password: yup.string().min(8).required('Password must be at least 8 characters'),
        firstName: yup.string().min(5).max(100).required(),
        lastName: yup.string().max(100),
    })
    .required();
export default signupSchema;
