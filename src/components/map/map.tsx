import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';

// import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';
import {Offer} from '../../types.ts';
const URL_MARKER_DEFAULT = 'img/pin.svg';
const URL_MARKER_CURRENT = 'img/pin-active.svg';


type MapProps = {
  type: string;
  activeOfferId?: string | null;
  offers: Offer[];
};
const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  // iconSize: [40, 40],
  // iconAnchor: [20, 40]
});
const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  // iconSize: [40, 40],
  // iconAnchor: [20, 40]
});
function Map({type, activeOfferId, offers}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0].city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });
        marker
          .setIcon(
            activeOfferId !== null && offer.id === activeOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeOfferId]);

  return <section className={`${type}__map map`} ref={mapRef}></section>;
}
export default Map;
