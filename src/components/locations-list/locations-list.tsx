import LocationItem from '../../components/location-item/location-item';
import {CityName, Offer} from '../../types';

type LocationsListProps = {
  IsFavorites: boolean;
  cities: CityName[];
  offers?: Offer[];
  activeCityName?: CityName;
}

function LocationsList({IsFavorites, cities, offers, activeCityName}: LocationsListProps): JSX.Element {

  return (
    <ul className={`${IsFavorites ? 'favorites__list' : 'locations__list tabs__list'}`} data-testid='locations-list-container'>
      {cities.map((cityName) => <LocationItem isFavorites={IsFavorites} isActive={cityName === activeCityName} cityName={cityName} offers={offers} key={cityName}/>)}
    </ul>
  );
}

export default LocationsList;
