import {Offer} from '../../types';
import {CardType} from '../../const';
import {Link} from 'react-router-dom';
import {formatRating} from '../../utils';
import FavoriteButton from '../favorite-button/favorite-button';

type CardProps = {
  card: Offer;
  isFavorites: boolean;
  cardType: CardType;
  onActiveOfferChange?: (id:string | null) => void;
}

function Card({card, isFavorites, cardType, onActiveOfferChange}: CardProps): JSX.Element {
  const {isPremium, price, title, type, id, previewImage, rating} = card;
  const ratingInStarsFormat: string = formatRating(rating);

  return (
    <article className={`${cardType}__card place-card`} onMouseEnter={() => onActiveOfferChange?.(id)} onMouseLeave={() => onActiveOfferChange?.(null)} data-testid="card-container">
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${cardType}__image-wrapper'} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={`${isFavorites ? 150 : 260}`}
            height={`${isFavorites ? 110 : 200}`}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${isFavorites ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <FavoriteButton offerId={id} isOfferPage={false}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingInStarsFormat}%` }}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
