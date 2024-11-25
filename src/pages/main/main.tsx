import PlaceCard from '../../components/place-card/place-card';
import Locations from '../../components/locations/locations';
import Header from '../../components/header/header';

type MainProps = {
  citiesCount: number;
  hasOfferData?: boolean;
}

function Main({citiesCount, hasOfferData = false}: MainProps): JSX.Element {

  return (
    <div className="page page--gray page--main">
      <Header hasNavigation />
      <main className={`page__main page__main--index ${hasOfferData ? '' : 'page__main--index-empty'}`}>
        <Locations/>
        <div className="cities">
          {hasOfferData ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">312 places to stay in Amsterdam</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
            Popular
                    <svg className="places__sorting-arrow" width={7} height={4}>
                      <use xlinkHref="#icon-arrow-select"/>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>
                    Popular
                    </li>
                    <li className="places__option" tabIndex={0}>
                    Price: low to high
                    </li>
                    <li className="places__option" tabIndex={0}>
                    Price: high to low
                    </li>
                    <li className="places__option" tabIndex={0}>
                    Top rated first
                    </li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  {Array.from({length: citiesCount}).map((_, i) => <PlaceCard key={i++}/>)}
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map"/>
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
