import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../components/Login';

// Mock for the props
const mockOnLogin = jest.fn(() => Promise.resolve(null));
const mockOnSignUp = jest.fn(() => Promise.resolve(null));

test('Sign In button is disabled unless both fields are filled and not loading', async () => {
  render(<Login onLogin={mockOnLogin} onSignUp={mockOnSignUp} />);

  const nameInput = screen.getByPlaceholderText('e.g. John Doe');
  const passwordInput = screen.getByPlaceholderText('••••••••');
  const signInBtn = screen.getByRole('button', { name: /sign in/i });

  // Both fields empty - button should be disabled
  expect(signInBtn).toBeDisabled();

  // Only name filled
  await userEvent.type(nameInput, 'Test User');
  expect(signInBtn).toBeDisabled();

  // Only password filled
  await userEvent.clear(nameInput);
  await userEvent.type(passwordInput, 'password123');
  expect(signInBtn).toBeDisabled();

  // Both fields filled
  await userEvent.type(nameInput, 'Test User');
  expect(signInBtn).not.toBeDisabled();
});
