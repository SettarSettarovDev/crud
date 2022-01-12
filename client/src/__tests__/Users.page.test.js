import { screen } from '@testing-library/react';
import { customRender } from './test-utils';
import UsersPage from '../pages/users/users.component';

test('should render Users page', () => {
  customRender(<UsersPage />);

  const usersText = screen.getByText('Users:');
  expect(usersText).toBeInTheDocument();
});
