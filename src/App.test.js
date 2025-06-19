import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Job Board title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Job Board/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders navigation buttons', () => {
  render(<App />);
  const homeButton = screen.getByText(/Home/i);
  const addJobButton = screen.getByText(/Add Job/i);
  const allJobsButton = screen.getByText(/All Jobs/i);
  
  expect(homeButton).toBeInTheDocument();
  expect(addJobButton).toBeInTheDocument();
  expect(allJobsButton).toBeInTheDocument();
});