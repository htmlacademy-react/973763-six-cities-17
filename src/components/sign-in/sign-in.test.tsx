import {render, screen, fireEvent} from '@testing-library/react';
import SignIn from './sign-in';
import {BrowserRouter} from 'react-router-dom';
import {withStore} from '../../mocks/mock-component';
import {makeFakeStore} from '../../mocks/mocks';
import {AuthorizationStatus, LoadingStatus} from '../../const';

describe('Component: SignIn', () => {
  const { withStoreComponent } = withStore(<SignIn />, makeFakeStore({
    USER: {
      authorizationStatus: AuthorizationStatus.AUTH,
      userData: null,
      favoriteOffers: [],
      favoritesLoadingStatus: LoadingStatus.NotLoaded,
      favoritesToggleStatus: LoadingStatus.NotLoaded,
    }
  }));

  it('should render correctly', () => {
    const expectedTestId = 'sign-in-container';

    render(withStoreComponent, {wrapper: BrowserRouter});
    const signInContainer = screen.getByTestId(expectedTestId);

    expect(signInContainer).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('validates email input', () => {
    render(withStoreComponent, {wrapper: BrowserRouter});

    const emailInput = screen.getByPlaceholderText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    expect(screen.getByText(/Email must match example@example.com!/i)).toBeInTheDocument();
  });

  it('validates password input', () => {
    render(withStoreComponent, {wrapper: BrowserRouter});

    const passwordInput = screen.getByPlaceholderText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: '12' } });

    expect(screen.getByText(/Password must contain 3 or more letters with numbers!/i)).toBeInTheDocument();
  });
});
