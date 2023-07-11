import { useRef, useEffect, memo } from 'react';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cityNames, URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const/const';
import { Offer } from '../../types/types';
import useMap from '../../hooks/use-map/use-map';
import { getSelectedCity } from '../../store/selectors';
import { useAppSelector } from '../../hooks';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

type MapProps = {
  offers: Offer[];
  currentOffer?: Offer;
  selectedPoint?: number | undefined;
  elementSelector: string;
};

function Map({ offers, currentOffer, selectedPoint, elementSelector }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const markersRef = useRef<Marker[]>([]);
  const map = useMap(mapRef, offers);
  const selectedCity = useAppSelector(getSelectedCity);

  useEffect(() => {
    if (map) {
      map.setView(
        [cityNames[selectedCity].latitude, cityNames[selectedCity].longitude],
        cityNames[selectedCity].zoom
      );

      markersRef.current.forEach((markerItem) => markerItem.remove());

      offers.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
        markersRef.current.push(marker);
      });

      if (currentOffer) {
        const marker = new Marker({
          lat: currentOffer.location.latitude,
          lng: currentOffer.location.longitude,
        });

        marker
          .setIcon(currentCustomIcon)
          .addTo(map);
        markersRef.current.push(marker);
      }
    }
  }, [map, offers, selectedPoint, selectedCity, currentOffer]);

  return <section className={elementSelector} ref={mapRef}></section>;
}

export default memo(Map);
