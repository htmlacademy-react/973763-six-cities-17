import CardList from '../card-list/card-list';
import {Offer} from '../../types';
import { mockFavoriteOffers } from '../../mocks/offers';


type LocationItemProps = {
  cityName: string;
  IsFavorites: boolean;
  offers?: Offer[];
}

function LocationItem({cityName, IsFavorites, offers = mockFavoriteOffers}: LocationItemProps): JSX.Element {
  return (
    <li className={`${IsFavorites ? 'favorites__locations-items' : 'locations__item'}`}>
      {
        IsFavorites ?
          <>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{cityName}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              <CardList cards={offers} IsFavorites/>
            </div>
          </>
          :
          <a className="locations__item-link tabs__item" href="#">
            <span>{cityName}</span>
          </a>
      }
    </li>
  );
}

export default LocationItem;
