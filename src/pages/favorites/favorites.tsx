import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import LocationsList from '../../components/locations-list/locations-list';
import {useAppSelector} from '../../store/use-app-selector';
import {getFavoriteOffers, getFavoritesCities} from '../../store/slices/user/selectors.ts';

function Favorites(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const favoriteCities = useAppSelector(getFavoritesCities);

  return (
    <div className={`page ${favoriteOffers.length ? '' : 'page--favorites-empty'}`}>
      <Header hasNavigation/>

      <main className={`page__main page__main--favorites ${favoriteOffers.length ? '' : 'page__main--favorites-empty'}`}>
        {favoriteOffers.length ?
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <LocationsList IsFavorites cities={favoriteCities} offers={favoriteOffers}/>
            </section>
          </div>
          :
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
          </div>}
      </main>
      <Footer/>
    </div>);
}

export default Favorites;
