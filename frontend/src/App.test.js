import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import RejectArticles from './components/RejectedArticles';
import AnalystQueue from './components/AnalystQueue';
import ModeratorQueue from './components/ModeratorQueue';
import UserSubmit from './components/UserSubmit';

test('renders the rejected articles table', async () => {
  render(<RejectArticles />);
  const tableElement = screen.getByText(/DOI/i);
  expect(tableElement).toBeInTheDocument();
});


test('renders the analyst queue table', async () => {
  render(<AnalystQueue />);
  const tableElement = screen.getByText(/DOI/i);
  expect(tableElement).toBeInTheDocument();
});


test('renders the moderator queue table', async () => {
  render(<ModeratorQueue />);
  const tableElement = screen.getByText(/DOI/i);
  expect(tableElement).toBeInTheDocument();
});

test('renders the user submit form', async () => {
  render(<UserSubmit />);
  const tableElement = screen.getByText(/DOI/i);
  expect(tableElement).toBeInTheDocument();
});
