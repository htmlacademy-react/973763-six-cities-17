type MapProps = {
  type: string;
  // eslint-disable-next-line react/no-unused-prop-types
  activeOfferId?: string | null;
}

function Map({type}:MapProps): JSX.Element {
  return(
    <section className={`${type}__map map`} />
  );
}
export default Map;
