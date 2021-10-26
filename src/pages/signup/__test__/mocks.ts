import { rest } from 'msw';
import settings from '../../../config';
const handlers = [
    rest.post(`${settings.baseUrl}/api/public/v1/signup`, (req, res, ctx) => {
        return res(ctx.status(422), ctx.json({ errors: [{ msg: 'duplicate email' }] }));
    }),
];

export default handlers;
