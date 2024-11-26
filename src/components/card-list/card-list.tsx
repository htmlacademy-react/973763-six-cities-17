import Card from '../card/card';
import {Offer} from '../../types';

type CardListProps = {
  cards: Offer[];
  IsFavorites: boolean;
}

function CardList({cards, IsFavorites}: CardListProps): JSX.Element {
  return (
    <>
      {cards.map((card) => <Card IsFavorites={IsFavorites} key={card.id}/>)}
    </>
  );
}

export default CardList;
