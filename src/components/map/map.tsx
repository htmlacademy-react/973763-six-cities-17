type MapProps = {
  type: string;
}

function Map({type}:MapProps): JSX.Element {
  return(
    <section className={`${type}__map map`} />
  );
}
export default Map;
