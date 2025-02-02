import {render, screen} from '@testing-library/react';
import {makeFakeOffer} from '../../mocks/mocks';
import Card from './card';
import userEvent from '@testing-library/user-event';
import {CardType} from '../../const';
import {BrowserRouter} from 'react-router-dom';

vi.mock('../../components/favorite-button/favorite-button', () => {
  const mockFavoriteButton = ({ offerId, isOfferPage }: { offerId: string; isOfferPage: boolean }) => <button data-testid="favorite-button">Mock favorite button{`FavoriteButton: ${offerId}, ${isOfferPage}`}</button>;
  return {
    default: mockFavoriteButton
  };
});

describe('Component: Card', () => {
  it('should render correctly', async () => {
    const expectedTestId = 'card-container';
    const offer = {
      ...makeFakeOffer(),
      id: '1'
    };
    const cardMouseEnterLeaveHandler = vi.fn();

    const preparedComponent = <Card card={offer} onActiveOfferChange={cardMouseEnterLeaveHandler} isFavorites cardType={CardType.Favorites} />;

    render(preparedComponent , {wrapper: BrowserRouter});

    const cardContainer = screen.getByTestId(expectedTestId);
    expect(cardContainer).toBeInTheDocument();

    await userEvent.hover(cardContainer);
    expect(cardMouseEnterLeaveHandler).toBeCalledTimes(1);

    await userEvent.unhover(cardContainer);
    expect(cardMouseEnterLeaveHandler).toHaveBeenCalledWith(null);

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(offer.price)).toBeInTheDocument();

    const imageElement = screen.getByAltText('Place image');
    expect(imageElement).toBeInTheDocument();

    const favoriteButton = screen.getByTestId('favorite-button');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveTextContent('FavoriteButton: 1, false');
  });

});
