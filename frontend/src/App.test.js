import { render, screen } from '@testing-library/react';
import App from './App';

test('pulls up homepage of the site', () => {
  render(<App />);
  const linkElement = screen.getByText(/center/i);
  expect(linkElement).toBeInTheDocument();
});
