import PageNotFound from '../pages/page-not-found/page-not-found.component';
import { screen } from '@testing-library/react';
import { customRender } from './test-utils';

test('shoud render PageNotFound page', () => {
  customRender(<PageNotFound />);
  const pageNotFoundElement = screen.getByText('Page not found');
  expect(pageNotFoundElement).toBeInTheDocument();
});
