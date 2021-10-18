import * as yup from 'yup';
const signupSchema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
        firstName: yup.string().min(5).max(50).required(),
        lastName: yup.string().max(50),
    })
    .required();
export default signupSchema;
