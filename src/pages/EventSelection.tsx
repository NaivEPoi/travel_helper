// src/pages/EventSelection.tsx
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface LocationState {
  data: Event[]
  location: string
  date: string
}

interface Event {
  name: string
  location: string
  timeAvailability: string
  expectedTime: string
}

const EventSelection: React.FC = () => {

  const [planResult, setPlanResult] = useState<string>('')
  const navigate = useNavigate()

  const location = useLocation()
  const { data, location: city, date} = location.state as LocationState || {}

  const availableEvents: Event[] = data ? data : []

  const [selectedEvents, setSelectedEvents] = useState<Event[]>([])

  const handleToggleEvent = (event: Event) => {
    if (selectedEvents.find(e => e.name === event.name)) {
      // Remove event from selected list
      setSelectedEvents(selectedEvents.filter(e => e.name !== event.name))
    } else {
      // Add event to selected list
      setSelectedEvents([...selectedEvents, event])
    }
  }

  const handlePlanEvent = (events: Event[]) => {
    fetch('/api/plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({events})
    })
      .then(response => response.json())
      .then((planResult: string) => setPlanResult(planResult))
      .catch((error) => console.error('Error planning event:', error));
      
      navigate('/map', { state: { planResult } })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md space-y-6 transition-colors">
      <h1 className="text-2xl font-bold mb-4">Selected Details</h1>
      <p className="text-lg"><strong>City:</strong> {city}</p>
      <p className="text-lg"><strong>Date:</strong> {date}</p>

      <h2 className="text-xl font-semibold mb-4">Available Events</h2>
      <ul className="space-y-4">
        {availableEvents.map((event, index) => {
          const isSelected = selectedEvents.find(e => e.name === event.name)

          return (
            <li key={index} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
              <strong className="text-lg">{event.name}</strong>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Time Availability:</strong> {event.timeAvailability}</p>
              <p><strong>Expected Time to Spend:</strong> {event.expectedTime}</p>
              <button
                onClick={() => handleToggleEvent(event)}
                className={`mt-2 px-3 py-1 rounded-lg transition-colors ${
                  isSelected ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                {isSelected ? 'Remove from List' : 'Add to List'}
              </button>
            </li>
          )
        })}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Your Selected Events</h2>
      {selectedEvents.length > 0 ? (
        <ul className="space-y-4 mt-4">
          {selectedEvents.map((event, index) => (
            <li key={index} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
              <strong className="text-lg">{event.name}</strong>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Time Availability:</strong> {event.timeAvailability}</p>
              <p><strong>Expected Time to Spend:</strong> {event.expectedTime}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 mt-4">No events selected yet.</p>
      )}
      <button
                onClick={() => handlePlanEvent(selectedEvents)}
                className={`mt-2 px-3 py-1 rounded-lg transition-colors ${'bg-green-500 hover:bg-green-600'
                } text-white`}
              >
                Plan Events
      </button>
    </div>
    
  )
}

export default EventSelection
