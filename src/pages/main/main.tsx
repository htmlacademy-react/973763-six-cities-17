import CardList from '../../components/card-list/card-list';
import LocationsList from '../../components/locations-list/locations-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import Sort from '../../components/sort/sort';
import {Offer} from '../../types';

type MainProps = {
  offers: Offer[];
}

function Main({offers}: MainProps): JSX.Element {
  const hasOfferData = Object.keys(offers).length > 0;

  return (
    <div className="page page--gray page--main">
      <Header hasNavigation />
      <main className={`page__main page__main--index ${hasOfferData ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList IsFavorites={false}/>
          </section>
        </div>
        <div className="cities">
          {hasOfferData ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in Amsterdam</b>
                <Sort/>
                <div className="cities__places-list places__list tabs__content">
                  <CardList cards={offers} IsFavorites={false}/>
                </div>
              </section>
              <div className="cities__right-section">
                <Map/>
              </div>
            </div>
            :
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in
                    Dusseldorf
                  </p>
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
