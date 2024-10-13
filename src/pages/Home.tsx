// src/pages/Home.tsx
import React from 'react';
import LocationDateRangeInput from '../components/LocationDateRangeInput';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the City Search App</h1>
      <LocationDateRangeInput />
    </div>
  );
};

export default Home;
