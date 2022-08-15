import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SignIn from '../SignIn';

describe('SignIn component test suite', () => {
  const name = 'Sign In';
  const mockFunction = jest.fn();

  const setup = () => {
    render(<SignIn />, { wrapper: BrowserRouter });
  };

  beforeEach(() => {
    setup();
  });

  test('Renders without errors', () => {
    const title = screen.getByRole('heading', { name });
    const form = screen.getByRole('button', { name });
    const link = screen.getByText(`Don't have an account? Sign Up`);

    expect(title).toBeTruthy();
    expect(form).toBeTruthy();
    expect(link).toBeTruthy();
  });
});
