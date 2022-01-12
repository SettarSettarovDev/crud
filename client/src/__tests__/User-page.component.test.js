import { screen } from '@testing-library/react';
import { customRender, handlers, jwt } from './test-utils';
import UserPage from '../pages/user-page/user-page.component';
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

describe('UserPage tests', () => {
  test('should render UserPage', () => {
    customRender(<UserPage />);
    const userNameElement = screen.getByTestId('userName');
    expect(userNameElement).toBeInTheDocument();
  });

  test('should remove user', async () => {
    customRender(<App />);
    userEvent.click(await screen.findByTestId(/usersLink/i));
    expect(await screen.findByText(/users:/i)).toBeInTheDocument();
    userEvent.click(await screen.findByText(/qwe@qwe.qwe/i));
    userEvent.click(await screen.findByTestId('deleteUserIcon'));
    expect(await screen.findByText(/users:/i)).toBeInTheDocument();
  });

  test('should open UserEditForm', async () => {
    customRender(<App />);
    userEvent.click(await screen.findByTestId(/usersLink/i));
    expect(await screen.findByText(/users:/i)).toBeInTheDocument();
    userEvent.click(await screen.findByText(/qwe@qwe.qwe/i));
    userEvent.click(await screen.findByTestId('editUserIcon'));
    expect(await screen.findByText(/user name/i)).toBeInTheDocument();
  });
});
