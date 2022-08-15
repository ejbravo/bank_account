import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Operations from '../Operations';

describe('Operations component test suite', () => {
  const mockOnChange = jest.fn();

  const setup = () => {
    render(<Operations onChange={() => mockOnChange()} />, {
      wrapper: BrowserRouter,
    });
  };

  beforeEach(() => {
    setup();
  });

  test('Renders without errors', () => {
    const incomeButton = screen.getByRole('button', { name: 'Income' });
    const withdrawButton = screen.getByRole('button', { name: 'Withdraw' });
    const textInput = screen.getByRole('textbox');

    expect(incomeButton).toBeTruthy();
    expect(withdrawButton).toBeTruthy();
    expect(textInput).toBeTruthy();
  });
});
