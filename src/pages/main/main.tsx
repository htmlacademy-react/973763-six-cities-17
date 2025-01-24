import LocationsList from '../../components/locations-list/locations-list';
import MainContainer from '../../components/main-container/main-container';
import Header from '../../components/header/header';
import {CITIES_NAMES} from '../../const';
import {useAppSelector} from '../../store/use-app-selector';
import {getActiveCityName, getSortedOffers} from '../../store/selectors';

function Main(): JSX.Element {
  const activeCityName = useAppSelector(getActiveCityName);
  const sortedOffers = useAppSelector(getSortedOffers);

  return (
    <div className="page page--gray page--main">
      <Header hasNavigation />
      <main className={`page__main page__main--index ${sortedOffers.length ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList IsFavorites={false} cities={CITIES_NAMES} activeCityName={activeCityName}/>
          </section>
        </div>
        <MainContainer offers={sortedOffers} activeCityName={activeCityName}/>
      </main>
    </div>
  );
}

export default Main;
