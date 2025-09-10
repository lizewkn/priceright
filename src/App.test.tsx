import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders PriceRight app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/PriceRight - Global Price Comparison/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders search input', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search for products/i);
  expect(searchInput).toBeInTheDocument();
});

test('renders search button', () => {
  render(<App />);
  const searchButton = screen.getByRole('button', { name: /Search Prices/i });
  expect(searchButton).toBeInTheDocument();
});

test('renders main heading', () => {
  render(<App />);
  const heading = screen.getByText(/Find the Best Prices with Shipping to Hong Kong/i);
  expect(heading).toBeInTheDocument();
});
