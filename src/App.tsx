import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';

// Define a type for the API response
interface ApiResponse {
  message: string;
}

function App() {
  const [count, setCount] = useState(0)

  const [data, setData] = useState<ApiResponse | null>(null);
  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then((data: ApiResponse) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); 

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <h1>Flask + Vite</h1>
        <p>{data ? data.message : "Loading..."}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!} onLoad={() => console.log('Maps API has loaded.')}>
        <div className="map-container">
          <Map
            defaultZoom={13}
            defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
            onCameraChanged={ (ev: MapCameraChangedEvent) =>
              console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }>
          </Map>
        </div>
      </APIProvider>
    </>
  )
}

export default App