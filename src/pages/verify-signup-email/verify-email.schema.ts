import * as yup from 'yup';
const verifyEmailSignup = yup
    .object({
        otp: yup
            .string()
            .required('Verification code is required')
            .matches(/^[0-9]+$/, 'Enter 6 digit numeric code')
            .min(6, 'Must be exactly 6 numeric digits')
            .max(6, 'Must be exactly 6 numeric digits'),
    })
    .required();
export default verifyEmailSignup;
