import CardList from '../../components/card-list/card-list';
import LocationsList from '../../components/locations-list/locations-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import Sort from '../../components/sort/sort';
import {CardType, CITIES_NAMES} from '../../const';
import {useEffect, useState} from 'react';
import {getOffersByCity, getOffersBySortOption} from '../../utils';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {mockOffers} from '../../mocks/offers';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {loadOffers} from '../../store/action';


function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadOffers(mockOffers));
  }, [dispatch]);

  const offers = useAppSelector((state) => state.offers);
  const activeCityName = useAppSelector((state) => state.activeCityName);
  const sortOption = useAppSelector((state) => state.offerSortOption);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const handleActiveOfferChange = (id: string | null): void => {
    if (activeOfferId !== id) {
      setActiveOfferId(id);
    }
  };

  const filteredOffersByActiveCity = getOffersByCity(offers, activeCityName);
  const sortedOffers = getOffersBySortOption(filteredOffersByActiveCity, sortOption);
  const hasOfferData = filteredOffersByActiveCity.length > 0;

  return (
    <div className="page page--gray page--main">
      <Header hasNavigation />
      <main className={`page__main page__main--index ${hasOfferData ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList IsFavorites={false} cities={CITIES_NAMES} activeCityName={activeCityName}/>
          </section>
        </div>
        <div className="cities">
          {hasOfferData ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffersByActiveCity.length} places to stay in {activeCityName}</b>
                <Sort sortOption={sortOption} />
                <div className="cities__places-list places__list tabs__content">
                  <CardList cards={sortedOffers} isFavorites={false} cardType={CardType.Cities} onActiveOfferChange={handleActiveOfferChange}/>
                </div>
              </section>
              <div className="cities__right-section">
                <Map type={'cities'} activeOfferId={activeOfferId} offers={sortedOffers} />
              </div>
            </div>
            :
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {activeCityName}</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>}
        </div>
      </main>
    </div>
  );
}

export default Main;
