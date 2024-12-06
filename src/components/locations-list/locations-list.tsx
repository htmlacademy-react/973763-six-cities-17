import LocationItem from '../../components/location-item/location-item';
import {Offer} from '../../types';
import {getOffersByFilter} from '../../utils.ts';

type LocationsListProps = {
  IsFavorites: boolean;
  cities: string[];
  offers: Offer[];
}

function LocationsList({IsFavorites, cities, offers}: LocationsListProps): JSX.Element {

  return (
    <ul className={`${IsFavorites ? 'favorites__list' : 'locations__list tabs__list'}`}>
      {cities.map((cityName) => <LocationItem isFavorites={IsFavorites} cityName={cityName} offers={getOffersByFilter(offers, cityName)} key={cityName}/>)}
    </ul>
  );
}

export default LocationsList;
