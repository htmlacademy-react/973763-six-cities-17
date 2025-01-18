import CardList from '../../components/card-list/card-list';
import LocationsList from '../../components/locations-list/locations-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import Sort from '../../components/sort/sort';
import {CardType, CITIES_NAMES} from '../../const';
import {useState} from 'react';
import {useAppSelector} from '../../store/use-app-selector';
import {getActiveCityName, getSortOption, getSortedOffers} from '../../store/selectors';

function Main(): JSX.Element {

  const activeCityName = useAppSelector(getActiveCityName);
  const sortOption = useAppSelector(getSortOption);
  const sortedOffers = useAppSelector(getSortedOffers);
  const hasOfferData = sortedOffers.length > 0;
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const handleActiveOfferChange = (id: string | null): void => {
    if (activeOfferId !== id) {
      setActiveOfferId(id);
    }
  };

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
                <b className="places__found">{sortedOffers.length} places to stay in {activeCityName}</b>
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
