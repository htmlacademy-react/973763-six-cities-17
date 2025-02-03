import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Error from './error';
import {RoutePath} from '../../routes';
import {BrowserRouter} from 'react-router-dom';

describe('Component Error page', () => {
  it('should render with correct content', () => {
    const expectedTestId = 'error-page';

    render(<Error />, {wrapper: BrowserRouter});

    const errorTextElement = screen.getByText(/Not found/i);
    const errorNumberElement = screen.getByText(/404/i);
    const linkElement = screen.getByRole('link', { name: /Go back to main/i });

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();

    expect(errorTextElement).toBeInTheDocument();
    expect(errorNumberElement).toBeInTheDocument();

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', RoutePath.INDEX);
  });
});
