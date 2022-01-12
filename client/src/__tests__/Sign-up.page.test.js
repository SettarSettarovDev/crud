import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import App from '../App';
import { customRender, handlers } from './test-utils';

const server = setupServer(...handlers);
// Enable API mocking before tests.
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('SignUp tests', () => {
  test('inputs should be initially empty', () => {
    customRender(<App />);
    const btnToSignUp = screen.getByText("I don't have an account");
    userEvent.click(btnToSignUp);
    const userNameInputElement = screen.getByLabelText('Username');
    const emailInputElement = screen.getByLabelText('Email');
    const passwordInputElement = screen.getByLabelText('Password');
    const isAdminInputElement = screen.getByLabelText('is admin');
    expect(userNameInputElement.value).toBe('');
    expect(emailInputElement.value).toBe('');
    expect(passwordInputElement.value).toBe('');
    expect(isAdminInputElement.checked).toEqual(false);
  });

  test('should show username error message when username is empty', async () => {
    customRender(<App />);
    const btnToSignUp = screen.getByText("I don't have an account");
    userEvent.click(btnToSignUp);
    const submitBtnElement = screen.getByRole('button');
    userEvent.click(submitBtnElement);
    const userErrorElement = await screen.findByText('Username is empty');
    expect(userErrorElement).toBeInTheDocument();
  });

  test('should show email error message when email is empty', async () => {
    customRender(<App />);
    const btnToSignUp = screen.getByText("I don't have an account");
    userEvent.click(btnToSignUp);
    const userNameInputElement = screen.getByLabelText('Username');
    const submitBtnElement = screen.getByRole('button');
    userEvent.type(userNameInputElement, 'test');
    userEvent.click(submitBtnElement);
    const emailErrorElement = await screen.findByText(
      'The email you input is invalid'
    );
    expect(emailErrorElement).toBeInTheDocument();
  });

  test('should show password error message when password is empty', async () => {
    customRender(<App />);
    const btnToSignUp = screen.getByText("I don't have an account");
    userEvent.click(btnToSignUp);
    const userNameInputElement = screen.getByLabelText('Username');
    const emailInputElement = screen.getByLabelText('Email');
    const submitBtnElement = screen.getByRole('button');
    userEvent.type(userNameInputElement, 'test');
    userEvent.type(emailInputElement, 'test@test.test');
    userEvent.click(submitBtnElement);
    const passwordErrorElement = await screen.findByText('Password is empty');
    expect(passwordErrorElement).toBeInTheDocument();
  });

  test('should show email error message when user with this email is already exist', async () => {
    customRender(<App />);
    const btnToSignUp = screen.getByText("I don't have an account");
    userEvent.click(btnToSignUp);
    const userNameInputElement = screen.getByLabelText('Username');
    const emailInputElement = screen.getByLabelText('Email');
    const passwordInputElement = screen.getByLabelText('Password');
    const submitBtnElement = screen.getByRole('button');
    userEvent.type(userNameInputElement, 'test');
    userEvent.type(emailInputElement, 'test@test.test');
    userEvent.type(passwordInputElement, 'test');
    userEvent.click(submitBtnElement);
    const emailExistErrorElement = await screen.findByText(
      'User with this email alredy exist',
      undefined,
      { timeout: 5000 }
    );
    expect(emailExistErrorElement).toBeInTheDocument();
  });

  test('should not show any error, registration successful', async () => {
    customRender(<App />);
    const btnToSignUp = screen.getByText("I don't have an account");
    userEvent.click(btnToSignUp);
    const userNameInputElement = screen.getByLabelText('Username');
    const emailInputElement = screen.getByLabelText('Email');
    const passwordInputElement = screen.getByLabelText('Password');
    const isAdminNameInputElement = screen.getByLabelText('is admin');
    const submitBtnElement = screen.getByRole('button');
    userEvent.type(userNameInputElement, 'newTest');
    userEvent.type(emailInputElement, 'newTest@test.test');
    userEvent.type(passwordInputElement, 'newTest');
    userEvent.click(isAdminNameInputElement);
    userEvent.click(submitBtnElement);
    const logout = await screen.findByText(/log out/i);
    expect(logout).toBeInTheDocument();
  });
});
