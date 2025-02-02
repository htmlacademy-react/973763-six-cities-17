import Card from '../card/card';
import {Offer} from '../../types';
import {CardType} from '../../const.ts';

type CardListProps = {
  cards: Offer[];
  isFavorites: boolean;
  cardType: CardType;
  onActiveOfferChange?: (id:string | null) => void;
}

function CardList({cards, isFavorites, cardType, onActiveOfferChange}: CardListProps): JSX.Element {
  return (
    <div data-testid='cards-list-container'>
      {cards.map((card) => <Card card={card} isFavorites={isFavorites} cardType={cardType} onActiveOfferChange={onActiveOfferChange} key={card.id}/>)}
    </div>
  );
}

export default CardList;
