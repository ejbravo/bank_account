import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SignUp from '../SignUp';

describe('SignUn component test suite', () => {
  const name = 'Sign Up';
  const mockFunction = jest.fn();

  const setup = () => {
    render(<SignUp />, { wrapper: BrowserRouter });
  };

  beforeEach(() => {
    setup();
  });

  test('Renders without errors', () => {
    const title = screen.getByRole('heading', { name });
    const form = screen.getByRole('button', { name });
    const link = screen.getByText(`Already have an account? Sign in`);

    expect(title).toBeTruthy();
    expect(form).toBeTruthy();
    expect(link).toBeTruthy();
  });
});
