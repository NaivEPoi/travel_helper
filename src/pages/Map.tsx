// src/pages/EventSelection.tsx
import React, {useEffect, useState, useRef} from 'react'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  MapCameraChangedEvent,
  useMap,
  Pin
} from '@vis.gl/react-google-maps'
import {MarkerClusterer} from '@googlemaps/markerclusterer'
import type {Marker} from '@googlemaps/markerclusterer'

const MapApp: React.FC = () => {
return (
  <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!} onLoad={() => console.log('Maps API has loaded.')}>
    <div className="map-container">
    {/* <p>{data ? data.message : "Loading..."}</p> */}
      <Map
        defaultZoom={15}
        defaultCenter={{ lat: 40.803854074441546, lng: -77.86536470268248 }}
        mapId={import.meta.env.VITE_GOOGLE_MAPS_ID!}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }
      >
        <PoiMarkers pois={locations} />
      </Map>
    </div>
  </APIProvider>
  )
}

type Poi = { 
  key: string, 
  location: google.maps.LatLngLiteral
}

const locations: Poi[] = [
  {key: 'Business Building', location: { lat: 40.803854074441546, lng: -77.86536470268248 }}
]

const PoiMarkers = (props: { pois: Poi[] }) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{[key: string]: Marker}>({})
  const clusterer = useRef<MarkerClusterer | null>(null)

  // Initialize MarkerClusterer, if the map has changed
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({map});
    }
  }, [map]);

  // Update markers, if the markers array has changed
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers])

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return
    if (!marker && !markers[key]) return

    setMarkers(prev => {
      if (marker) {
        return {...prev, [key]: marker};
      } else {
        const newMarkers = {...prev};
        delete newMarkers[key];
        return newMarkers;
      }
    })
  }

  return (
    <>
      {props.pois.map( (poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          ref={marker => setMarkerRef(marker, poi.key)}
          >
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      ))}
    </>
  )
}
  
export default MapApp