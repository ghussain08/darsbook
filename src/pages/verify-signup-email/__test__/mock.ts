import { rest } from 'msw';
import settings from '../../../config';
const verifyEmailMockHandlers = [
    rest.post(`${settings.baseUrl}/api/public/v1/signup/verify-email`, (req, res, ctx) => {
        return res(ctx.status(422), ctx.json({ errors: [{ msg: 'Incorrect OTP' }] }));
    }),
];

export default verifyEmailMockHandlers;
