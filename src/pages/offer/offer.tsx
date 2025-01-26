import CardList from '../../components/card-list/card-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import {CardType, NEARBY_OFFERS_OM_MAP_MAX_COUNT, REVIEWS_OM_PAGE_MAX_COUNT} from '../../const';
import Gallery from '../../components/gallery/gallery';
import Feedback from '../../components/feedback/feedback';
import ReviewsList from '../../components/reviews-list/reviews-list';
import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../store/use-app-selector';
import {useAppDispatch} from '../../store/use-app-dispatch';
import {useEffect} from 'react';
import {fetchOfferAction, fetchNearbyOffersAction, fetchReviewsAction} from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import {formatRating} from '../../utils';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import Error from '../error/error';
import FavoritesButton from '../../components/favorite-button/favorite-button';
import {getIsOfferPageLoading, getNearbyOffers, getOffer} from '../../store/slices/offer/selectors';
import {getIsAuthed} from '../../store/slices/user/selectors';
import {getSortedReviews} from '../../store/slices/review/selectors';

function Offer(): JSX.Element {
  const {id: offerId} = useParams();
  const dispatch = useAppDispatch();
  const offer = useAppSelector(getOffer);

  useScrollToTop();

  useEffect(() => {
    dispatch(fetchOfferAction(offerId)).unwrap().then(()=> {
      dispatch(fetchReviewsAction(offerId));
      dispatch(fetchNearbyOffersAction(offerId));
    });
  }, [dispatch, offerId]);

  const isAuthed = useAppSelector(getIsAuthed);
  const isLoading = useAppSelector(getIsOfferPageLoading);
  const nearByOffers = useAppSelector(getNearbyOffers).slice(0, NEARBY_OFFERS_OM_MAP_MAX_COUNT);
  const reviews = useAppSelector(getSortedReviews).slice(0, REVIEWS_OM_PAGE_MAX_COUNT);
  const mapOffers = offer === null ? [] : [offer, ...nearByOffers];

  if (isLoading) {
    return <Spinner />;
  }

  if (offer !== null && offerId) {
    const ratingInStarsFormat: string = formatRating(offer.rating);
    const bedroomLabel = offer.bedrooms > 1 ? `${offer.bedrooms} Bedrooms` : '1 Bedroom';
    const adultsLabel = offer.maxAdults > 1 ? `Max ${offer.maxAdults} adults` : 'Max 1 adult';

    return (
      <div className="page">
        <Header hasNavigation />
        <main className="page__main page__main--offer">
          <section className="offer">
            <Gallery images={offer.images.slice(0, 6)}/>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer.isPremium && <div className="offer__mark"><span>Premium</span></div>}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{offer.title}</h1>
                  <FavoritesButton offerId={offerId} isOfferPage/>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${ratingInStarsFormat}%` }}/>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">{offer.type}</li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {bedroomLabel}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    {adultsLabel}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€120</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What is inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => <li className="offer__inside-item" key={good}>{good}</li>)}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper user__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`} >
                      <img
                        className="offer__avatar user__avatar"
                        src={`${offer.host.avatarUrl}`}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{offer.description}</p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <ReviewsList reviews={reviews}/>
                  {isAuthed && <Feedback/>}
                </section>
              </div>
            </div>
            <Map type={'offer'} activeOfferId={offerId} offers={mapOffers}/>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                <CardList cards={nearByOffers} isFavorites={false} cardType={CardType.NearPlaces}/>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  } else {
    return <Error />;
  }
}

export default Offer;
