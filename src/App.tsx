import './App.css'


// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventSelection from './pages/EventSelection';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event-selection" element={<EventSelection />} />
      </Routes>
    </Router>
  );
};

export default App;
