import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Movements from '../Movements';

describe('Movements component test suite', () => {
  const name = 'My account';
  const mockFunction = jest.fn();

  const setup = () => {
    render(<Movements />, { wrapper: BrowserRouter });
  };

  beforeEach(() => {
    setup();
  });

  test('Renders without errors', () => {
    const title = screen.getByRole('heading', { name });
    const table = screen.getByRole('table');
    const logoutButton = screen.getByRole('button', { name: 'LogOut' });

    expect(title).toBeTruthy();
    expect(table).toBeTruthy();
    expect(logoutButton).toBeTruthy();
  });
});
