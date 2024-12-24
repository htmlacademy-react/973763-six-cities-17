import LocationItem from '../../components/location-item/location-item';
import {CityName, Offer} from '../../types';
import {getOffersByCity} from '../../utils.ts';

type LocationsListProps = {
  IsFavorites: boolean;
  cities: CityName[];
  offers?: Offer[];
  activeCityName?: CityName;
}

function LocationsList({IsFavorites, cities, offers, activeCityName}: LocationsListProps): JSX.Element {

  return (
    <ul className={`${IsFavorites ? 'favorites__list' : 'locations__list tabs__list'}`}>
      {cities.map((cityName) => <LocationItem isFavorites={IsFavorites} isActive={cityName === activeCityName} cityName={cityName} offers={offers && getOffersByCity(offers, cityName)} key={cityName}/>)}
    </ul>
  );
}

export default LocationsList;
