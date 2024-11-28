import { CITIES_NAMES } from '../../const';
import LocationItem from '../../components/location-item/location-item';

type LocationsListProps = {
  IsFavorites: boolean;
}

function LocationsList({IsFavorites}: LocationsListProps): JSX.Element {
  return (
    <ul className={`${IsFavorites ? 'favorites__list' : 'locations__list tabs__list'}`}>
      {CITIES_NAMES.map((cityName) => <LocationItem IsFavorites={IsFavorites} cityName={cityName} key={cityName}/>)}
    </ul>
  );
}

export default LocationsList;
