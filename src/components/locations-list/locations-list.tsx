import LocationItem from '../../components/location-item/location-item';
import {Offer} from '../../types';
import {getOffersByCity} from '../../utils.ts';

type LocationsListProps = {
  IsFavorites: boolean;
  cities: string[];
  offers?: Offer[];
  onCityNameClick?: (cityName:string) => void;
  activeCityName?: string;
}

function LocationsList({IsFavorites, cities, offers, onCityNameClick, activeCityName}: LocationsListProps): JSX.Element {

  return (
    <ul className={`${IsFavorites ? 'favorites__list' : 'locations__list tabs__list'}`}>
      {cities.map((cityName) => <LocationItem isFavorites={IsFavorites} isActive={cityName === activeCityName} cityName={cityName} offers={offers && getOffersByCity(offers, cityName)} onCityNameClick={onCityNameClick} key={cityName}/>)}
    </ul>
  );
}

export default LocationsList;
