import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import {CityLocation} from '../types';
import {MapInfo} from '../const';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: CityLocation): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom
      });
      const layer = new TileLayer(MapInfo.URL_TEMPLATE,
        {attribution: MapInfo.ATTRIBUTION}
      );
      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    } else {
      map?.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [mapRef, city, map]);

  return map;
}
export default useMap;
