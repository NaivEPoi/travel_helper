// src/App.tsx
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import EventSelection from './pages/EventSelection'
import MapApp from './pages/Map'

// Define a type for the API response
// interface ApiResponse {
//   message: string;
// }

const App: React.FC = () => {
  // const [data, setData] = useState<ApiResponse | null>(null);
  // useEffect(() => {
  //   fetch('/api/data')
  //     .then(response => response.json())
  //     .then((data: ApiResponse) => setData(data))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []); 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event-selection" element={<EventSelection />} />
        <Route path="/map" element={<MapApp />} />
      </Routes>
    </Router>
  )
}

export default App
