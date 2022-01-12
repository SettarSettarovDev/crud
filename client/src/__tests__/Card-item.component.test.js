import { screen, waitForElementToBeRemoved } from '@testing-library/react';
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

describe('Card-item tests', () => {
  test('should delete card item', async () => {
    customRender(<App />);
    userEvent.click(await screen.findByTestId('deletedCardId-1'));
    await waitForElementToBeRemoved(() => screen.queryByText('first'));
    expect((await screen.findAllByTestId('cardId')).length).toBe(1);
  });
});
