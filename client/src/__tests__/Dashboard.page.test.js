import { screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { customRender, handlers } from './test-utils';
import Dashboard from '../pages/dashboard/dashboard.component';

const server = setupServer(...handlers);
// Enable API mocking before tests.
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('should render Dashboard page', () => {
  customRender(<Dashboard />);

  const dashboardText = screen.getByText('Dashboard:');
  expect(dashboardText).toBeInTheDocument();
});

test('shoud calculate age', () => {
  customRender(<Dashboard />);
});
