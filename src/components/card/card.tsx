import {Offer} from '../../types';
import {CardType} from '../../const.ts';

type CardProps = {
  card: Offer;
  isFavorites: boolean;
  cardType: CardType;
}

function Card({card, isFavorites, cardType}: CardProps): JSX.Element {
  const {isPremium, price, title, type} = card;

  return (
    <article className={`${cardType}__card place-card`}>
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${cardType}__image-wrapper'} place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src="/img/apartment-01.jpg"
            width={`${isFavorites ? 150 : 260}`}
            height={`${isFavorites ? 110 : 200}`}
            alt="Place image"
          />
        </a>
      </div>
      <div className={`${isFavorites ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button button"
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80%'}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">
            {title}
          </a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
