import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
// This jest.mock call is required to prevent Jest complaining about
// the usage of useNavigate() outside of a <Router> element. In the acutal
// application useNavigate() is called within a <Router> element, but not
// in the test environment, so this call needs to be present.
jest.mock("react-router-dom", () => ({
  useNavigate: () => {},
}));
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
