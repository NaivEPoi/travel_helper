// src/App.tsx
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import EventSelection from './pages/EventSelection'
import MapApp from './pages/Map'

const App: React.FC = () => {
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
