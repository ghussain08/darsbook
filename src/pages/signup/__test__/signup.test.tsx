import React from "react";
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Signup from "../index";
import settings from "../../../config";
import handlers from "./mocks";
import { render } from "../../../utils/test-util";
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Signup page", () => {
    it("should render default view", () => {
        render(<Signup />, {});
        const { getByTestId } = screen;
        const emailField = getByTestId("email-field");
        expect(emailField).toHaveValue("");

        const passwordField = getByTestId("password-field");
        expect(passwordField).toHaveValue("");

        const firstNameField = getByTestId("firstname-field");
        expect(firstNameField).toHaveValue("");

        const lastNameField = getByTestId("lastname-field");
        expect(lastNameField).toHaveValue("");

        const loginText = getByTestId("login-text");
        expect(loginText).toHaveTextContent("Already created?");

        const termsAndConditionText = getByTestId("terms-and-condition-text");
        expect(termsAndConditionText).toHaveTextContent(/terms and condition/);

        const brandText = getByTestId("brandname-text");
        expect(brandText).toHaveTextContent(settings.brandName!);

        const submitBtn = getByTestId("signup-submit-btn");
        expect(submitBtn.getAttribute("disabled")).toBeNull();
    });

    it("should not submit if email is invalid", async () => {
        render(<Signup />, {});
        const { getByTestId } = screen;
        const emailField = getByTestId("email-field");
        const submitBtn = getByTestId("signup-submit-btn");
        expect(emailField).toHaveValue("");
        userEvent.type(emailField, "test");
        expect(emailField).toHaveValue("test");
        await waitFor(() => userEvent.click(submitBtn));
        expect(emailField.getAttribute("aria-invalid")).toBe("true");
    });

    it("should not submit if email is more than 150 characters", async () => {
        render(<Signup />, {});
        const { getByTestId } = screen;
        const emailField = getByTestId("email-field");
        const submitBtn = getByTestId("signup-submit-btn");
        expect(emailField).toHaveValue("");
        userEvent.type(emailField, `${Array(200).fill("f").join("")}@gmail.com`);
        await waitFor(() => userEvent.click(submitBtn));
        expect(emailField.getAttribute("aria-invalid")).toBe("true");
    });

    it("should not submit if password is empty", async () => {
        render(<Signup />, {});
        const { getByTestId } = screen;
        const passwordField = getByTestId("password-field");
        const submitBtn = getByTestId("signup-submit-btn");
        expect(passwordField).toHaveValue("");
        await waitFor(() => userEvent.click(submitBtn));
        expect(passwordField.getAttribute("aria-invalid")).toBe("true");
    });
    it("should not submit if password is less than 8 characters", async () => {
        render(<Signup />, {});
        const { getByTestId } = screen;
        const passwordField = getByTestId("password-field");
        userEvent.type(passwordField, "test");
        const submitBtn = getByTestId("signup-submit-btn");
        await waitFor(() => userEvent.click(submitBtn));
        expect(passwordField.getAttribute("aria-invalid")).toBe("true");
    });
    it("should not submit if firstname is empty", async () => {
        render(<Signup />, {});
        const { getByTestId } = screen;
        const firstName = getByTestId("firstname-field");
        const submitBtn = getByTestId("signup-submit-btn");
        expect(firstName).toHaveValue("");
        await waitFor(() => userEvent.click(submitBtn));
        expect(firstName.getAttribute("aria-invalid")).toBe("true");
    });
    it("should not submit if firstname is longer than 100 characters", async () => {
        render(<Signup />, {});
        const { getByTestId } = screen;
        const firstName = getByTestId("firstname-field");
        const submitBtn = getByTestId("signup-submit-btn");
        expect(firstName).toHaveValue("");
        userEvent.type(firstName, Array(101).fill("f").join(""));
        await waitFor(() => userEvent.click(submitBtn));
        expect(firstName.getAttribute("aria-invalid")).toBe("true");
    });

    it("should not submit if lastname is longer than 100 characters", async () => {
        render(<Signup />, {});
        const { getByTestId } = screen;
        const lastname = getByTestId("lastname-field");
        const submitBtn = getByTestId("signup-submit-btn");
        expect(lastname).toHaveValue("");
        userEvent.type(lastname, Array(101).fill("f").join(""));
        await waitFor(() => userEvent.click(submitBtn));
        expect(lastname.getAttribute("aria-invalid")).toBe("true");
    });

    it("should submit when all fields are valid", async () => {
        render(<Signup />, {});
        const { getByTestId } = screen;
        const emailField = getByTestId("email-field");
        userEvent.type(emailField, "hussainkhan1200@gmail.com");

        const passwordField = getByTestId("password-field");
        userEvent.type(passwordField, "12345678");

        const firstNameField = getByTestId("firstname-field");
        userEvent.type(firstNameField, "Gulam Hussain");

        const submitBtn = getByTestId("signup-submit-btn");
        await waitFor(() => userEvent.click(submitBtn));
        expect(emailField.getAttribute("aria-invalid")).toBe("false");
        expect(passwordField.getAttribute("aria-invalid")).toBe("false");
        expect(firstNameField.getAttribute("aria-invalid")).toBe("false");
    });

    it("show error if email is already registered", async () => {
        render(<Signup />, {});
        const { getByTestId, queryByRole } = screen;
        const emailField = getByTestId("email-field");
        userEvent.type(emailField, "hussainkhan1200@gmail.com");

        const passwordField = getByTestId("password-field");
        userEvent.type(passwordField, "12345678");

        const firstNameField = getByTestId("firstname-field");
        userEvent.type(firstNameField, "Gulam Hussain");

        const submitBtn = getByTestId("signup-submit-btn");
        expect(submitBtn).not.toBeDisabled();

        expect(queryByRole("progressbar")).not.toBeInTheDocument();
        userEvent.click(submitBtn);
        await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
    });
    it("Redirect to verify email page if api return success", async () => {
        server.use(
            rest.post(`${settings.baseUrl}/api/public/v1/signup`, (req, res, ctx) => {
                return res(ctx.status(200), ctx.json({ data: { userId: 1, email: "hussainkhan1200@gmail.com" } }));
            })
        );
        const { history } = render(<Signup />, {});
        const { getByTestId, queryByRole } = screen;
        const emailField = getByTestId("email-field");
        userEvent.type(emailField, "hussainkhan1200@gmail.com");
        const passwordField = getByTestId("password-field");
        userEvent.type(passwordField, "12345678");
        const firstNameField = getByTestId("firstname-field");
        userEvent.type(firstNameField, "Gulam Hussain");
        const submitBtn = getByTestId("signup-submit-btn");
        expect(queryByRole("progressbar")).not.toBeInTheDocument();
        expect(submitBtn).not.toBeDisabled();
        userEvent.click(submitBtn);
        await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
        expect(history.location.pathname).toBe("/verify-email");
    });
});
