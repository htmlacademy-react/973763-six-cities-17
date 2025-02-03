import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './private-route';
import { RoutePath } from '../../routes';
import { useAppSelector } from '../../store/use-app-selector';
import { vi } from 'vitest';

vi.mock('../../store/use-app-selector', () => ({
  useAppSelector: vi.fn(),
}));

describe('PrivateRoute component', () => {
  it('should redirect to the specified path if user is not authenticated', () => {
    vi.mocked(useAppSelector).mockReturnValue(false);

    const navigatePath = RoutePath.LOGIN;
    const protectedContent = 'Protected Content';

    render(
      <MemoryRouter initialEntries={[RoutePath.FAVORITES]}>
        <Routes>
          <Route
            path={RoutePath.FAVORITES}
            element={
              <PrivateRoute navigatePath={navigatePath}>
                <div>{protectedContent}</div>
              </PrivateRoute>
            }
          />
          <Route path={RoutePath.LOGIN} element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText(protectedContent)).not.toBeInTheDocument();
  });

  it('should render children if user is authenticated', () => {
    vi.mocked(useAppSelector).mockReturnValue(true);

    const navigatePath = RoutePath.LOGIN;
    const protectedContent = 'Protected Content';

    render(
      <MemoryRouter initialEntries={[RoutePath.FAVORITES]}>
        <Routes>
          <Route
            path={RoutePath.FAVORITES}
            element={
              <PrivateRoute navigatePath={navigatePath}>
                <div>{protectedContent}</div>
              </PrivateRoute>
            }
          />
          <Route path={RoutePath.LOGIN} element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(protectedContent)).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
