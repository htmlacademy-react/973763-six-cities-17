type LocationItem = {
  cityName: string;
}

function LocationItem({cityName}: LocationItem): JSX.Element {
  return (
    <li className="locations__item">
      <a className="locations__item-link tabs__item" href="#">
        <span>{cityName}</span>
      </a>
    </li>
  );
}

export default LocationItem;
