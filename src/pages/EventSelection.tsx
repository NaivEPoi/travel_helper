// src/pages/EventSelection.tsx
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

interface LocationState {
  location: string;
  startDate: string;
  endDate: string;
}

interface Event {
  name: string;
  location: string;
  timeAvailability: string;
  expectedTime: string;
}

const availableEvents: Event[] = [
  {
    name: 'City Tour',
    location: 'Downtown',
    timeAvailability: '9:00 AM - 5:00 PM',
    expectedTime: '2 hours'
  },
  {
    name: 'Museum Visit',
    location: 'Main Street Museum',
    timeAvailability: '10:00 AM - 6:00 PM',
    expectedTime: '1.5 hours'
  },
  {
    name: 'Concert',
    location: 'Central Park',
    timeAvailability: '6:00 PM - 9:00 PM',
    expectedTime: '3 hours'
  },
  {
    name: 'Food Festival',
    location: 'City Square',
    timeAvailability: '11:00 AM - 8:00 PM',
    expectedTime: '2.5 hours'
  },
  {
    name: 'Art Exhibition',
    location: 'Art District',
    timeAvailability: '12:00 PM - 5:00 PM',
    expectedTime: '2 hours'
  },
  {
    name: 'Sports Game',
    location: 'Stadium',
    timeAvailability: '3:00 PM - 7:00 PM',
    expectedTime: '4 hours'
  }
]

const EventSelection: React.FC = () => {
  const location = useLocation();
  const { location: city, startDate, endDate } = location.state as LocationState || {};

  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

  const handleAddEvent = (event: Event) => {
    if (!selectedEvents.find(e => e.name === event.name)) {
      setSelectedEvents([...selectedEvents, event]);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Selected Details</h1>
      <p className="text-lg"><strong>City:</strong> {city}</p>
      <p className="text-lg"><strong>Start Date:</strong> {startDate}</p>
      <p className="text-lg mb-6"><strong>End Date:</strong> {endDate}</p>

      <h2 className="text-xl font-semibold mb-4">Available Events</h2>
      <ul className="space-y-4">
        {availableEvents.map((event, index) => (
          <li key={index} className="p-4 bg-white rounded-lg shadow">
            <strong className="text-lg">{event.name}</strong>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Time Availability:</strong> {event.timeAvailability}</p>
            <p><strong>Expected Time to Spend:</strong> {event.expectedTime}</p>
            <button
              onClick={() => handleAddEvent(event)}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
            >
              Add to List
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Your Selected Events</h2>
      {selectedEvents.length > 0 ? (
        <ul className="space-y-4 mt-4">
          {selectedEvents.map((event, index) => (
            <li key={index} className="p-4 bg-white rounded-lg shadow">
              <strong className="text-lg">{event.name}</strong>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Time Availability:</strong> {event.timeAvailability}</p>
              <p><strong>Expected Time to Spend:</strong> {event.expectedTime}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mt-4">No events selected yet.</p>
      )}
    </div>
  )
}

export default EventSelection;
