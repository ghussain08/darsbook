import CheckAuth from '..';
import { render } from '../../../utils/test-util';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import settings from '../../../config';
import { waitForElementToBeRemoved } from '@testing-library/react';
const server = setupServer(
    rest.get(`${settings.baseUrl}/api/private/v1/user`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                isAuthenticated: true,
                user: null,
            })
        );
    })
);

describe('Check auth on page load', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    it('should redirect to login if user data is not returned by check auth api', async () => {
        const { getByRole, history } = render(
            <CheckAuth>
                <p>test</p>
            </CheckAuth>,
            { initialState: { user: null } }
        );
        const progressbar = getByRole('progressbar', { hidden: true });
        expect(progressbar).toBeInTheDocument();
        await waitForElementToBeRemoved(() => getByRole('progressbar', { hidden: true }));
        expect(history.location.pathname).toBe('/login');
    });

    it('should render children if user data is available in api response', async () => {
        server.use(
            rest.get(`${settings.baseUrl}/api/private/v1/user`, (req, res, ctx) => {
                return res(ctx.status(200), ctx.json({ data: { user: { id: 1, name: 'test' } } }));
            })
        );
        const { history, getByRole, getByTestId } = render(
            <CheckAuth>
                <p data-testid="demo-id">TEST</p>
            </CheckAuth>,
            { initialEntries: ['/'], initialIndex: 0, initialState: { user: null } }
        );
        const progressbar = getByRole('progressbar', { hidden: true });
        expect(progressbar).toBeInTheDocument();
        await waitForElementToBeRemoved(() => getByRole('progressbar', { hidden: true }));
        const testChildren = getByTestId('demo-id');
        expect(testChildren).toBeInTheDocument();
        expect(history.location.pathname).toBe('/');
    });
});
