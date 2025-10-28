import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogInput from '../components/LogInput';

test('Log button is enabled only when log entry field is non-empty and not submitting', async () => {
  render(<LogInput onAddLog={jest.fn()} />);

  const logBtn = screen.getByRole('button', { name: /log/i });
  const input = screen.getByPlaceholderText('Enter manual log entry...');

  // Initial: input is empty, button disabled
  expect(logBtn).toBeDisabled();

  // Type text in input, button becomes enabled
  await userEvent.type(input, 'Test log entry');
  expect(logBtn).not.toBeDisabled();

  // Clear input, button disables again
  await userEvent.clear(input);
  expect(logBtn).toBeDisabled();

  // Simulate submission, button disables while submitting
  await userEvent.type(input, 'Test log entry');
  await userEvent.click(logBtn);
  expect(logBtn).toBeDisabled();

  // After 500ms, button re-enabled (simulate timer if needed in test environment)
});
