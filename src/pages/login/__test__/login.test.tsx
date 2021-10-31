import Login from '..';
import { render } from '../../../utils/test-util';
import { act, fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../../../config';
import userEvent from '@testing-library/user-event';
const server = setupServer(
    rest.post(`${config.baseUrl}/api/public/v1/login`, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ errors: [{ msg: 'Email or password are incorrect' }] }));
    })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe('Login', () => {
    it('should render correctly', () => {
        const { container } = render(<Login />, { initialEntries: ['/login'], initialIndex: 0 });
        expect(container).toBeInTheDocument();
    });

    it('should not submit when email and password are empty', async () => {
        render(<Login />, { initialEntries: ['/login'], initialIndex: 0 });
        const { getByLabelText, getByText } = screen;
        const email = getByLabelText(/Email/);
        const password = getByLabelText(/Password/);
        const submit = getByText('Login');
        fireEvent.change(email, { target: { value: '' } });
        fireEvent.change(password, { target: { value: '' } });
        await waitFor(() => fireEvent.click(submit));
        expect(email.getAttribute('aria-invalid')).toBe('true');
        expect(password.getAttribute('aria-invalid')).toBe('true');
    });

    it('should show cogo-toast when email or password is incorrect', async () => {
        const { history } = render(<Login />, { initialEntries: ['/login'], initialIndex: 0 });
        const { getByLabelText, getByText, findByRole, getByRole } = screen;
        const email = getByLabelText(/Email/);
        const password = getByLabelText(/Password/);
        const submit = getByText('Login');
        fireEvent.change(email, { target: { value: 'hu@gmail.com' } });
        fireEvent.change(password, { target: { value: '1234567' } });
        act(() => userEvent.click(submit));
        const progressBarLoader = await findByRole('progressbar');
        expect(progressBarLoader).toBeInTheDocument();
        expect(submit).toBeDisabled();
        await waitForElementToBeRemoved(() => getByRole('progressbar'));
        expect(submit).not.toBeDisabled();
        expect(history.location.pathname).toBe('/login');
    });
});
