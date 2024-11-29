import Card from '../card/card';
import {Offer} from '../../types';

type CardListProps = {
  cards: Offer[];
  isFavorites: boolean;
  cardType: string;
}

function CardList({cards, isFavorites, cardType}: CardListProps): JSX.Element {
  return (
    <>
      {cards.map((card) => <Card isPremium={card.isPremium} isFavorites={isFavorites} cardType={cardType} key={card.id}/>)}
    </>
  );
}

export default CardList;
