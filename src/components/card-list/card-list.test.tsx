import {render, screen} from '@testing-library/react';
import {makeFakeOffer} from '../../mocks/mocks';
import CardList from './card-list';
import {CardType} from '../../const';

vi.mock('../../components/card/card', () => {
  const mockCard = () => <div data-testid='card-container'>Mock Card</div>;
  return {
    default: mockCard
  };
});

describe('Component: CardsList', () => {
  it('should render correctly', () => {
    const expectedTestId = 'cards-list-container';
    const cardContainerTestId = 'card-container';
    const offers = [makeFakeOffer()];
    const cardMouseEnterLeaveHandler = vi.fn();

    render(<CardList cards={offers} isFavorites cardType={CardType.Favorites} onActiveOfferChange={cardMouseEnterLeaveHandler} />);

    const cardsListContainer = screen.getByTestId(expectedTestId);
    const cardItems = screen.getAllByTestId(cardContainerTestId);

    expect(cardsListContainer).toBeInTheDocument();
    expect(cardItems.length).toBe(1);
  });
});
