import CardList from '../card-list/card-list';
import {Offer} from '../../types';
import {CardType} from '../../const';
import React from 'react';
import {Link} from "react-router-dom";

type LocationItemProps = {
  cityName: string;
  isFavorites: boolean;
  offers?: Offer[];
  onCityNameClick?: (cityName:string) => void;
  isActive: boolean;
}

function LocationItem({cityName, isFavorites, offers, onCityNameClick, isActive}: LocationItemProps): JSX.Element {
  return (
    <li className={`${isFavorites ? 'favorites__locations-items' : 'locations__item'}`}>
      {
        isFavorites ?
          <>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to={''}>
                  <span>{cityName}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {offers && <CardList cards={offers} isFavorites cardType={CardType.Favorites}/>}
            </div>
          </>
          :
          <Link to={''} className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
            onClick={(): void => onCityNameClick?.(cityName)}
          >
            <span>{cityName}</span>
          </Link>
      }
    </li>
  );
}

export default LocationItem;
