import { screen } from '@testing-library/react';
import { customRender, handlers, jwt, newProfile } from './test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { setupServer } from 'msw/node';
import AddAndEditProfile from '../components/add-and-edit-profile/add-and-edit-profile.component';

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

describe('AddAndEditProfile tests', () => {
  test('should render profile add form', async () => {
    customRender(<App />);
    userEvent.click(await screen.findByText(/create new profile/i));
    expect(await screen.findByLabelText(/name:/i)).toBeInTheDocument();
  });

  test('should add new profile', async () => {
    customRender(<App />);
    userEvent.click(await screen.findByText(/create new profile/i));
    userEvent.type(await screen.findByLabelText(/name/i), 'third');
    userEvent.click(await screen.findByLabelText('male'));
    userEvent.type(await screen.findByLabelText(/birthdate:/i), '2022-01-01');
    userEvent.type(await screen.findByLabelText(/city:/i), 'thirdCity');
    userEvent.click(await screen.findByTestId('profileAddFormSubmitBtn'));
    expect(await screen.findByText(/third$/i)).toBeInTheDocument();
    const genderInput = await screen.findAllByText('Male');
    expect(genderInput[genderInput.length - 1]).toBeInTheDocument();
    expect(await screen.findByText(/2022-01-01$/i)).toBeInTheDocument();
    expect(await screen.findByText(/thirdCity$/i)).toBeInTheDocument();
  });

  test('should render profile edit form', async () => {
    customRender(<AddAndEditProfile fromEdit={true} item={newProfile} />);
    expect((await screen.findByLabelText('male')).checked).toBeTruthy();
  });

  test('should edit profile', async () => {
    customRender(<App />);
    userEvent.click(await screen.findByTestId('editedCardId-1'));
    userEvent.type(await screen.findByLabelText(/name/i), 'zzz');
    userEvent.type(await screen.findByLabelText(/city:/i), 'zzz');
    userEvent.click(await screen.findByTestId('profileAddFormSubmitBtn'));
    expect(await screen.findByText(/firstzzz$/i)).toBeInTheDocument();
    expect(await screen.findByText('Male')).toBeInTheDocument();
    expect(await screen.findByText(/2022-01-01$/i)).toBeInTheDocument();
    expect(await screen.findByText(/firstCityzzz$/i)).toBeInTheDocument();
  });
});
