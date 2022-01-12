import { screen } from '@testing-library/react';
import App from '../App';
import { setupServer } from 'msw/node';
import { customRender, handlers } from './test-utils';

const server = setupServer(...handlers);
// Enable API mocking before tests.
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('should login by token', async () => {
  window.localStorage.setItem(
    'token',
    JSON.stringify(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJ1c2VyRW1haWwiOiJ0ZXN0QHRlc3QudGVzdCIsInVzZXJSb2xlIjoiQURNSU4iLCJ1c2VyTmFtZSI6InRlc3QiLCJpYXQiOjE2NDE4MjMwNTMsImV4cCI6MTY0MTkwOTQ1M30.etlX4hiQQzINHAqoTGtIoom_o_C9HWdwEyijNGCaks4'
    )
  );
  customRender(<App />);

  const logout = await screen.findByText(/log out/i);
  expect(logout).toBeInTheDocument();
});
