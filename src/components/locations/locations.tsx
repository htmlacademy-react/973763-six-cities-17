import { CITIES_NAMES } from '../../const';

function Locations(): JSX.Element {
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CITIES_NAMES.map((cityName) =>
              (
                <li className="locations__item" key={cityName}>
                  <a className="locations__item-link tabs__item" href="#">
                    <span>{cityName}</span>
                  </a>
                </li>
              )
            )}
          </ul>
        </section>
      </div>
    </>
  );
}

export default Locations;
