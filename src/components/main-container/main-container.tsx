import CardList from '../../components/card-list/card-list';
import Map from '../../components/map/map';
import Sort from '../../components/sort/sort';
import {CardType} from '../../const';
import {useState} from 'react';
import {CityName, Offer} from '../../types';

type MainContainerProps = {
  activeCityName: CityName;
  offers: Offer[];
}

function MainContainer({activeCityName, offers}: MainContainerProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className="cities">
      {offers.length > 0 ?
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {activeCityName}</b>
            <Sort/>
            <div className="cities__places-list places__list tabs__content">
              <CardList cards={offers} isFavorites={false} cardType={CardType.Cities} onActiveOfferChange={setActiveOfferId}/>
            </div>
          </section>
          <div className="cities__right-section">
            <Map type={'cities'} activeOfferId={activeOfferId} offers={offers} />
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
  );
}

export default MainContainer;
