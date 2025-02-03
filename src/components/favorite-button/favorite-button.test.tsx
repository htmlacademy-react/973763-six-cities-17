import {render, screen} from '@testing-library/react';
import FavoriteButton from './favorite-button';
import {makeFakeStore} from '../../mocks/mocks';
import {BrowserRouter} from 'react-router-dom';
import {withStore} from '../../mocks/mock-component';
describe('Component: Favorite button', () => {
  it('should render correctly', () => {
    const expectedTestId = 'favorite-button-container';
    const { withStoreComponent } = withStore(<FavoriteButton isOfferPage={false} offerId={'some-id'}/>, makeFakeStore({}));

    render(withStoreComponent, {wrapper: BrowserRouter});

    const favoriteButtonContainer = screen.getByTestId(expectedTestId);

    expect(favoriteButtonContainer).toBeInTheDocument();

  });
});
