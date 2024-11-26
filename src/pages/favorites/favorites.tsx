import CardList from '../../components/card-list/card-list';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {Offer} from '../../types';
import { mockFavoriteOffers } from '../../mocks/offers';

type FavoritesProps = {
  offers: Offer[];
}

function Favorites({offers = mockFavoriteOffers}: FavoritesProps): JSX.Element {
  const hasOfferData = Object.keys(offers).length > 0;

  return (
    <div className="page page--favorites-empty">
      <Header hasNavigation/>

      <main className={`page__main page__main--favorites ${hasOfferData ? '' : 'page__main--favorites-empty'}`}>
        {hasOfferData ?
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Amsterdam</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <CardList cards={offers} IsFavorites />
                  </div>
                </li>
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Cologne</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <CardList cards={offers} IsFavorites />
                  </div>
                </li>
              </ul>
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
