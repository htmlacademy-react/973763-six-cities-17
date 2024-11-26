import Card from '../card/card';
import {Offer} from '../../types';

type CardListProps = {
  cards: Offer[];
}

function CardList({cards}: CardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {cards.map((card) => <Card key={card.id}/>)}
    </div>
  );
}

export default CardList;
