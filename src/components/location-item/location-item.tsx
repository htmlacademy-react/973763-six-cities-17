import CardList from '../card-list/card-list';
import {Offer} from '../../types';
import {CardType} from '../../const';

type LocationItemProps = {
  cityName: string;
  isFavorites: boolean;
  offers?: Offer[];
}

function LocationItem({cityName, isFavorites, offers}: LocationItemProps): JSX.Element {
  return (
    <li className={`${isFavorites ? 'favorites__locations-items' : 'locations__item'}`}>
      {
        isFavorites ?
          <>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{cityName}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {offers && <CardList cards={offers} isFavorites cardType={CardType.Favorites}/>}
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
