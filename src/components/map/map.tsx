type MapProps = {
  type: string;
  activeOfferId?: string | null;
}

function Map({type, activeOfferId}:MapProps): JSX.Element {
  return(
    <section className={`${type}__map map`} />
  );
}
export default Map;
