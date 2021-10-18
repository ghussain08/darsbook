import * as yup from "yup";
const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();
export default loginSchema;
