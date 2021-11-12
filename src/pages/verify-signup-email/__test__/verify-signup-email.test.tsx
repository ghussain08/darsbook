import VerifySignupEmail from "../index";
import { waitFor, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { render } from "../../../utils/test-util";
import verifyEmailMockHandlers from "./mock";
import { rest } from "msw";
import settings from "../../../config";
const server = setupServer(...verifyEmailMockHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const emptyFormState = { email: "" };
const filledFormState = {
    email: "test@gmail.com",
};
describe("Verify signup email page", () => {
    it("should redirect to signup page if email is not available in redux store", () => {
        const { history } = render(<VerifySignupEmail />, { initialState: { email: emptyFormState } });
        expect(history.location.pathname).toBe("/sign-up");
    });

    it("should render verify email page if email is available in redux store", () => {
        const { history } = render(<VerifySignupEmail />, {
            initialState: { email: filledFormState },
            initialEntries: ["/verify-email"],
        });
        expect(history.location.pathname).toBe("/verify-email");
    });

    it("should render default view of the page", () => {
        render(<VerifySignupEmail />, {
            initialState: { email: filledFormState },
            initialEntries: ["/verify-email"],
        });
        const otpField = screen.getByLabelText(/Enter email verification code/);
        expect(otpField).toHaveValue("");
        expect(otpField.getAttribute("aria-invalid")).toBe("false");
        const submitBtn = screen.getByText("Verify email");
        expect(submitBtn).not.toBeDisabled();
        const resendBtn = screen.queryByText(/Resend OTP/);
        expect(resendBtn).not.toBeInTheDocument();
    });

    it("Should not submit if otp is not valid input", async () => {
        render(<VerifySignupEmail />, {
            initialState: { email: filledFormState },
            initialEntries: ["/verify-email"],
        });

        const otpFields = screen.getByLabelText(/Enter email verification code/);
        userEvent.type(otpFields, "HUSSAIN");
        expect(otpFields).toHaveValue("HUSSAIN");
        const submitBtn = screen.getByText(/Verify email/);
        await waitFor(() => userEvent.click(submitBtn));
        expect(otpFields.getAttribute("aria-invalid")).toBe("true");
    });
    it("Should submit if otp is valid 6 digit numeric digit", async () => {
        render(<VerifySignupEmail />, {
            initialState: { email: filledFormState },
            initialEntries: ["/verify-email"],
        });
        const otpFields = screen.getByLabelText(/Enter email verification code/);
        userEvent.type(otpFields, "123456");
        expect(otpFields).toHaveValue("123456");
        const submitBtn = screen.getByText(/Verify email/);
        await waitFor(() => userEvent.click(submitBtn));
        expect(otpFields.getAttribute("aria-invalid")).toBe("false");
    });

    it("Should show server error message in case of error", async () => {
        render(<VerifySignupEmail />, {
            initialState: { email: filledFormState },
            initialEntries: ["/verify-email"],
        });
        const otpFields = screen.getByLabelText(/Enter email verification code/);
        userEvent.type(otpFields, "123456");
        expect(otpFields).toHaveValue("123456");
        const submitBtn = screen.getByText(/Verify email/);
        userEvent.click(submitBtn);
        expect(otpFields.getAttribute("aria-invalid")).toBe("false");
        await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
    });

    it("it should redirect to / on successfull email verification", async () => {
        server.use(
            rest.post(`${settings.baseUrl}/api/public/v1/signup/verify-email`, (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({ data: { user: { email: "huss@gmail.com", userId: 1 }, token: "12345" } })
                );
            })
        );
        const { history } = render(<VerifySignupEmail />, {
            initialState: { email: filledFormState },
            initialEntries: ["/verify-email"],
        });
        const otpFields = screen.getByLabelText(/Enter email verification code/);
        userEvent.type(otpFields, "123456");
        expect(otpFields).toHaveValue("123456");
        const submitBtn = screen.getByText(/Verify email/);
        userEvent.click(submitBtn);
        expect(otpFields.getAttribute("aria-invalid")).toBe("false");
        await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
        expect(history.location.pathname).toBe("/");
    });
});
