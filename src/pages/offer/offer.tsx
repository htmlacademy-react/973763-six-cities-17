import CardList from '../../components/card-list/card-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import {OfferDetail} from '../../types';
import { mockOfferDetail } from '../../mocks/offers';
import { mockNearbyOffers } from '../../mocks/offers';
import {CardType} from '../../const';
import Gallery from '../../components/gallery/gallery';
import Feedback from '../../components/feedback/feedback';

type OfferProps = {
  offerDetail: OfferDetail;
}

function Offer({offerDetail = mockOfferDetail}: OfferProps): JSX.Element {
  return (
    <div className="page">
      <Header hasNavigation />
      <main className="page__main page__main--offer">
        <section className="offer">
          <Gallery images={offerDetail.images}/>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offerDetail.isPremium && <div className="offer__mark"><span>Premium</span></div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offerDetail.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: '80%'}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offerDetail.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offerDetail.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerDetail.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offerDetail.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€120</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What is inside</h2>
                <ul className="offer__inside-list">
                  {offerDetail.goods.map((good) => <li className="offer__inside-item" key={good}>{good}</li>)}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={`${offerDetail.host.avatarUrl}`}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offerDetail.host.name}</span>
                  {offerDetail.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offerDetail.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">1</span>
                </h2>
                <ul className="reviews__list">
                  <li className="reviews__item">
                    <div className="reviews__user user">
                      <div className="reviews__avatar-wrapper user__avatar-wrapper">
                        <img
                          className="reviews__avatar user__avatar"
                          src="/img/avatar-max.jpg"
                          width={54}
                          height={54}
                          alt="Reviews avatar"
                        />
                      </div>
                      <span className="reviews__user-name">Max</span>
                    </div>
                    <div className="reviews__info">
                      <div className="reviews__rating rating">
                        <div className="reviews__stars rating__stars">
                          <span style={{width: '80%'}}/>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <p className="reviews__text">
                        A quiet cozy and picturesque that hides behind a a river by
                        the unique lightness of Amsterdam. The building is green and
                        from 18th century.
                      </p>
                      <time className="reviews__time" dateTime="2019-04-24">
                        April 2019
                      </time>
                    </div>
                  </li>
                </ul>
                <Feedback/>
              </section>
            </div>
          </div>
          <Map type={'offer'}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <CardList cards={mockNearbyOffers} isFavorites={false} cardType={CardType.NearPlaces}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
