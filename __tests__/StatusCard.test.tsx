/* import { render, screen } from '@testing-library/react';
import StatusCard from '../components/StatusCard';

test('renders the status card with a unit', () => {
  render(
    <StatusCard
      icon={<span role="img" aria-label="temp">🌡️</span>}
      label="Temperature"
      value="25"
      unit="°C"
    />
  );
  expect(screen.getByText(/25/)).toBeInTheDocument();
  expect(screen.getByText(/°C/)).toBeInTheDocument();
});


test('renders the status card with a unit', () => {
  render(
    <StatusCard
      icon={<span role="img" aria-label="temp">🌡️</span>}
      label="Temperature"
      value="25"
      unit="°C"
    />
  );
  // Check for combined value/unit
  expect(screen.getByText(/25 °C/)).toBeInTheDocument();
});
*/
