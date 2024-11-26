import { CITIES_NAMES } from '../../const';
import LocationItem from '../../components/location-item/location-item';

function LocationsList(): JSX.Element {
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CITIES_NAMES.map((cityName) => <LocationItem cityName={cityName} key={cityName}/>)}
          </ul>
        </section>
      </div>
    </>
  );
}

export default LocationsList;
