// src/pages/EventSelection.tsx
import React from 'react'
import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps'

const MapApp: React.FC = () => {
return (
  <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!} onLoad={() => console.log('Maps API has loaded.')}>
    <div className="map-container">
    {/* <p>{data ? data.message : "Loading..."}</p> */}
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }
      >
      </Map>
    </div>
  </APIProvider>
  )
}
  
export default MapApp