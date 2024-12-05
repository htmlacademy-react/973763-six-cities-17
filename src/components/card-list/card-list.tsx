import Card from '../card/card';
import {Offer} from '../../types';
import {CardType} from '../../const.ts';

type CardListProps = {
  cards: Offer[];
  isFavorites: boolean;
  cardType: CardType;
}

function CardList({cards, isFavorites, cardType}: CardListProps): JSX.Element {
  return (
    <>
      {cards.map((card) => <Card card={card} isFavorites={isFavorites} cardType={cardType} key={card.id}/>)}
    </>
  );
}

export default CardList;
