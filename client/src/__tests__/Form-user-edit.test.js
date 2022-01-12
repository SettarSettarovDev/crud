import { screen } from '@testing-library/react';
import { customRender, handlers, jwt } from './test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { setupServer } from 'msw/node';

const server = setupServer(...handlers);
// Enable API mocking before tests.
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
// Disable API mocking after the tests are done.
afterAll(() => server.close());

beforeAll(() => {
  window.localStorage.setItem('token', JSON.stringify(jwt));
});

describe('Form-user-edit tests', () => {
  test('should render user edit form', async () => {
    customRender(<App />);
    userEvent.click(await screen.findByTestId(/usersLink/i));
    expect(await screen.findByText(/users:/i)).toBeInTheDocument();
    userEvent.click(await screen.findByText(/qwe@qwe.qwe/i));
    userEvent.click(await screen.findByTestId('editUserIcon'));
    expect(await screen.findByText(/user name/i)).toBeInTheDocument();
  });
  test('should check if user edit form filled with data [role: user]', async () => {
    customRender(<App />);
    userEvent.click(await screen.findByTestId(/usersLink/i));
    userEvent.click(await screen.findByText(/qwe@qwe.qwe/i));
    userEvent.click(await screen.findByTestId('editUserIcon'));
    const userNameInputElement = await screen.findByLabelText(/user name:/i);
    const emailInputElement = await screen.findByLabelText(/email:/i);
    const userRoleInputElement = await screen.findByLabelText(/user$/i);
    expect(userNameInputElement.value).toBe('qwe');
    expect(emailInputElement.value).toBe('qwe@qwe.qwe');
    expect(userRoleInputElement.checked).toBeTruthy();
  });
  test('should check if user edit form filled with data [role: admin]', async () => {
    customRender(<App />);
    userEvent.click(await screen.findByTestId(/usersLink/i));
    userEvent.click(await screen.findByText(/test@test.test/i));
    userEvent.click(await screen.findByTestId('editUserIcon'));
    const userNameInputElement = await screen.findByLabelText(/user name:/i);
    const emailInputElement = await screen.findByLabelText(/email:/i);
    const adminRoleInputElement = await screen.findByLabelText(/admin/i);
    expect(userNameInputElement.value).toBe('test');
    expect(emailInputElement.value).toBe('test@test.test');
    expect(adminRoleInputElement.checked).toBeTruthy();
  });

  test('should change user data', async () => {
    customRender(<App />);
    userEvent.click(await screen.findByTestId(/usersLink/i));
    userEvent.click(await screen.findByText(/test@test.test/i));
    userEvent.click(await screen.findByTestId('editUserIcon'));
    const userNameInputElement = await screen.findByLabelText(/user name:/i);
    const emailInputElement = await screen.findByLabelText(/email:/i);
    const btnSubmit = await screen.findByTestId('userEditFormSubmitBtn');
    userEvent.type(userNameInputElement, 'yyy');
    userEvent.type(emailInputElement, 'zzz');
    userEvent.click(btnSubmit);
    expect(await screen.findByText(/profiles:/i)).toBeInTheDocument();
    expect((await screen.findAllByText(/testyyy/i))[1]).toBeInTheDocument();
    expect(await screen.findByText(/test@test.testzzz/i)).toBeInTheDocument();
  });
});
