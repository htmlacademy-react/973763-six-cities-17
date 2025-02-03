import {render, screen} from '@testing-library/react';
import Spinner from './spinner';
import {BrowserRouter} from 'react-router-dom';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const expectedTestId = 'spinner-container';
    const expectedClassName = 'loader';
    const preparedComponent = <Spinner />;

    render(preparedComponent, {wrapper: BrowserRouter});
    const spinnerContainer = screen.getByTestId(expectedTestId);

    expect(spinnerContainer).toBeInTheDocument();
    expect(spinnerContainer).toHaveClass(expectedClassName);

  });
});
