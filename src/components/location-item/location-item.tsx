import CardList from '../card-list/card-list';
import {CityName, Offer} from '../../types';
import {CardType} from '../../const';
import {getOffersByCity} from '../../utils';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../store/use-app-dispatch';
import {setActiveCityName} from '../../store/slices/app/app';
import {RoutePath} from '../../routes';

type LocationItemProps = {
  cityName: CityName;
  isFavorites: boolean;
  offers?: Offer[];
  isActive: boolean;
}

function LocationItem({cityName, isFavorites, offers, isActive}: LocationItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const offersByCity = offers && getOffersByCity(offers, cityName);
  const handleLinkClick = () => dispatch(setActiveCityName(cityName));

  return (
    <li className={`${isFavorites ? 'favorites__locations-items' : 'locations__item'}`} data-testid='location-item-container'>
      {
        isFavorites ?
          <>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to={RoutePath.INDEX} onClick={handleLinkClick}>
                  <span>{cityName}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {offersByCity && <CardList cards={offersByCity} isFavorites cardType={CardType.Favorites}/>}
            </div>
          </>
          :
          <Link to={' '} className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
            onClick={handleLinkClick}
          >
            <span>{cityName}</span>
          </Link>
      }
    </li>
  );
}

export default LocationItem;
