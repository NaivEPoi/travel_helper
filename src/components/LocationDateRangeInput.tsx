// src/components/LocationDateRangeInput.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];

const LocationDateRangeInput: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  
  const navigate = useNavigate();

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (value) {
      const filteredCities = cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredCities);
    } else {
      setSuggestions([]);
    }
  };

  const handleCitySelect = (city: string) => {
    setLocation(city);
    setSuggestions([]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (location && startDate && endDate) {
      navigate('/event-selection', { state: { location, startDate, endDate } });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md space-y-6 transition-colors">
      <div>
        <label className="block font-bold mb-2 text-gray-700 dark:text-gray-300">Location:</label>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter city"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        {suggestions.length > 0 && (
          <ul className="border border-t-0 bg-white dark:bg-gray-700 shadow-md rounded-b-lg">
            {suggestions.map((city, index) => (
              <li key={index} onClick={() => handleCitySelect(city)} className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label className="block font-bold mb-2 text-gray-700 dark:text-gray-300">Date Range:</label>
        <div className="flex space-x-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <span className="flex items-center text-gray-500 dark:text-gray-400">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>
      <button type="submit" className="w-full bg-blue-500 dark:bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition-colors">
        Submit
      </button>
    </form>
  );
};

export default LocationDateRangeInput;
