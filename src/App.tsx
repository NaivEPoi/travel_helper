// src/App.tsx
import './App.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventSelection from './pages/EventSelection';
import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event-selection" element={<EventSelection />} />
      </Routes>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!} onLoad={() => console.log('Maps API has loaded.')}>
        <div className="map-container">
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
    </Router>
  );
};

export default App;
