import { render, screen } from '@testing-library/react';
import HeaderNav from './header-nav';
import {BrowserRouter} from 'react-router-dom';
import {withStore} from '../../mocks/mock-component';
import {makeFakeStore} from '../../mocks/mocks';
import {AuthorizationStatus, LoadingStatus} from '../../const';

describe('Component: Header Nav', () => {
  it('should render correctly', () => {
    const headerNavContainerTestId = 'header-nav-container';
    const { withStoreComponent } = withStore(<HeaderNav />, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.UNKNOWN,
        userData: null,
        favoriteOffers: [],
        favoritesLoadingStatus: LoadingStatus.NotLoaded,
        favoritesToggleStatus: LoadingStatus.NotLoaded,
      }
    }));

    render(withStoreComponent,{wrapper: BrowserRouter});

    const headerContainer = screen.getByTestId(headerNavContainerTestId);
    expect(headerContainer).toBeInTheDocument();
  });
});
