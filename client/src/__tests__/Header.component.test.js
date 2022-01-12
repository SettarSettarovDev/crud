import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import App from '../App';
import { customRender, handlers, jwt } from './test-utils';

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

describe('Header test', () => {
  test('user should logout', async () => {
    customRender(<App />);
    userEvent.click(await screen.findByText(/log out/i));
    expect((await screen.findAllByText(/sign in/i))[0]).toBeInTheDocument();
  });
});
