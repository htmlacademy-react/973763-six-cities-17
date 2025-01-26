import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import {Offer} from '../../types';
import {UrlMarker, IconMarkerSize, IconAnchorSize} from '../../const';

type MapProps = {
  type: string;
  activeOfferId?: string | null;
  offers: Offer[];
};

const defaultCustomIcon = new Icon({
  iconUrl: UrlMarker.DEFAULT,
  iconSize: [IconMarkerSize.WIDTH, IconMarkerSize.HEIGHT],
  iconAnchor: [IconAnchorSize.WIDTH, IconAnchorSize.HEIGHT]
});

const currentCustomIcon = new Icon({
  iconUrl: UrlMarker.CURRENT,
  iconSize: [IconMarkerSize.WIDTH, IconMarkerSize.HEIGHT],
  iconAnchor: [IconAnchorSize.WIDTH, IconAnchorSize.HEIGHT]
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
