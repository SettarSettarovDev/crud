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

describe('Sign-in test', () => {
  test('inputs should be initially empty', () => {
    customRender(<App />);
    const emailInputElement = screen.getByLabelText('Email');
    const passwordInputElement = screen.getByLabelText('Password');
    expect(emailInputElement.value).toBe('');
    expect(passwordInputElement.value).toBe('');
  });

  test('should show email error message when email is empty', async () => {
    customRender(<App />);
    const submitBtnElement = screen.getByRole('button');
    userEvent.click(submitBtnElement);
    const emailErrorElement = await screen.findByText(
      'The email you input is invalid'
    );
    expect(emailErrorElement).toBeInTheDocument();
  });

  test('should show password error message when password is empty', async () => {
    customRender(<App />);
    const emailInputElement = screen.getByLabelText('Email');
    const submitBtnElement = screen.getByRole('button');
    userEvent.type(emailInputElement, 'test@test.test');
    userEvent.click(submitBtnElement);
    const passwordErrorElement = await screen.findByText('Password is empty');
    expect(passwordErrorElement).toBeInTheDocument();
  });

  test('should show email error message when user is not found', async () => {
    customRender(<App />);
    const emailInputElement = screen.getByLabelText('Email');
    const submitBtnElement = screen.getByRole('button');
    const passwordInputElement = screen.getByLabelText('Password');
    userEvent.type(emailInputElement, 'test@test.testt');
    userEvent.type(passwordInputElement, 'test');
    userEvent.click(submitBtnElement);
    const emailErrorElement = await screen.findByText(
      'User not found',
      undefined,
      { timeout: 3000 }
    );
    expect(emailErrorElement).toBeInTheDocument();
  });

  test('should show incorrect password error message', async () => {
    customRender(<App />);
    const emailInputElement = screen.getByLabelText('Email');
    const submitBtnElement = screen.getByRole('button');
    const passwordInputElement = screen.getByLabelText('Password');
    userEvent.type(emailInputElement, 'test@test.test');
    userEvent.type(passwordInputElement, 'wrongPassword');
    userEvent.click(submitBtnElement);
    const emailErrorElement = await screen.findByText(
      'Incorrect password',
      undefined,
      { timeout: 3000 }
    );
    expect(emailErrorElement).toBeInTheDocument();
  });

  test('should not show any error, login succsesfull', async () => {
    customRender(<App />);
    const emailInputElement = screen.getByLabelText('Email');
    const passwordInputElement = screen.getByLabelText('Password');
    const submitBtnElement = screen.getByRole('button');
    userEvent.type(emailInputElement, 'test@test.test');
    userEvent.type(passwordInputElement, 'somePassword');
    userEvent.click(submitBtnElement);
    const logout = await screen.findByText(/log out/i);
    expect(logout).toBeInTheDocument();
  });
});
