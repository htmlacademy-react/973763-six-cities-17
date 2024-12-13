import CardList from '../card-list/card-list';
import {Offer} from '../../types';
import {CardType} from '../../const';
import React from 'react';

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
          <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
            onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
              e.preventDefault();
              onCityNameClick?.(cityName);
            }}
          >
            <span>{cityName}</span>
          </a>
      }
    </li>
  );
}

export default LocationItem;
