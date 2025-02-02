import {render, screen} from '@testing-library/react';
import Footer from './footer';
import {BrowserRouter} from 'react-router-dom';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedTestId = 'footer-container';
    const expectedAltText = '6 cities logo';
    const preparedComponent = <Footer />;

    render(preparedComponent, {wrapper: BrowserRouter});
    const footerContainer = screen.getByTestId(expectedTestId);

    expect(footerContainer).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
