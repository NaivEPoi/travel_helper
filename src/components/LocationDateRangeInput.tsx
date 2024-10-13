// src/components/LocationDateRangeInput.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const LocationDateRangeInput: React.FC = () => {
  const [location, setLocation] = useState<string>('')
  const [Date, setDate] = useState<string>('')
  
  const navigate = useNavigate();

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocation(value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (location && Date) {
      navigate('/event-selection', { state: { location, Date } })
    } else {
      alert('Please fill in all fields.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md space-y-6 transition-colors">
      <div>
        <label className="block font-bold mb-2 text-gray-700 dark:text-gray-300 text-left">Location:</label>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter city"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <label className="block font-bold mb-2 text-gray-700 dark:text-gray-300 text-left">Date:</label>
        <div className="flex space-x-2">
          <input
            type="date"
            value={Date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>
      <button type="submit" className="w-full bg-blue-500 dark:bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition-colors">
        Submit
      </button>
    </form>
  )
}

export default LocationDateRangeInput;
