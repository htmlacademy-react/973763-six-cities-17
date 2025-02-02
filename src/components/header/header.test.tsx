import { render, screen } from '@testing-library/react';
import Header from './header';
import {BrowserRouter} from 'react-router-dom';
import {RoutePath} from '../../routes';

vi.mock('../../components/header-nav/header-nav', () => {
  const mockHeaderNav = () => <div data-testid='header-nav-container'>Mock Header Nav</div>;
  return {
    default: mockHeaderNav
  };
});

describe('Component: Header', () => {
  it('should render correctly', () => {
    const headerContainerTestId = 'header-container';
    const preparedComponent = <Header hasNavigation />;

    render(preparedComponent,{wrapper: BrowserRouter});

    const headerContainer = screen.getByTestId(headerContainerTestId);
    expect(headerContainer).toBeInTheDocument();

    const logoElement = screen.getByAltText('6 cities logo');
    expect(logoElement).toBeInTheDocument();

    const linkElement = screen.getByRole('link', { name: /6 cities logo/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', RoutePath.INDEX);
  });

  it('should render HeaderNav when hasNavigation is true', () => {
    render(<Header hasNavigation />,{wrapper: BrowserRouter});

    const headerNavElement = screen.getByTestId('header-nav-container');
    expect(headerNavElement).toBeInTheDocument();
  });

  it('should not render HeaderNav when hasNavigation is false', () => {
    render(<Header hasNavigation={false} />,{wrapper: BrowserRouter});

    const headerNavElement = screen.queryByTestId('header-nav-container');
    expect(headerNavElement).not.toBeInTheDocument();
  });
});
