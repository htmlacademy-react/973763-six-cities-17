import CardList from '../card-list/card-list';
import {CityName, Offer} from '../../types';
import {CardType} from '../../const';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {setActiveCityName} from '../../store/action';

type LocationItemProps = {
  cityName: CityName;
  isFavorites: boolean;
  offers?: Offer[];
  isActive: boolean;
}

function LocationItem({cityName, isFavorites, offers, isActive}: LocationItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <li className={`${isFavorites ? 'favorites__locations-items' : 'locations__item'}`}>
      {
        isFavorites ?
          <>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to={' '}>
                  <span>{cityName}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {offers && <CardList cards={offers} isFavorites cardType={CardType.Favorites}/>}
            </div>
          </>
          :
          <Link to={' '} className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
            onClick={() => {
              dispatch(setActiveCityName(cityName));
            }}
          >
            <span>{cityName}</span>
          </Link>
      }
    </li>
  );
}

export default LocationItem;
