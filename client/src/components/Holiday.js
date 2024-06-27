import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

import apiURL from '../api'

export const Holiday = ({ fetchHolidays, fetchHolidayMakers }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { holiday } = location.state

  async function deleteHoliday (holidayId) {
    try {
      const res = await fetch(`${apiURL}/holidays/${holidayId}`, {
        method: 'DELETE'
      })
      await res.json()
      fetchHolidays()
      navigate('/')

    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  }

  function confirmDelete(id) {
		// Returns true if the user presses OK, otherwise false
		const confirmed = window.confirm("Are you sure you want to delete this holiday data?");

		if (confirmed) {
			deleteHoliday(id);
		}
	}

return (
    <div className="Holiday">
        <button 
            type="button"
            className="backButton" 
            onClick={props.goHome}
        >
                Go back
        </button>
        <main className='content'>
            <div className="holiday">
                <img className="holiday-img" src={`assets/${holiday.type}.png`} alt={holiday.type} />
                <div className="holiday-details">
                    <h1 className="holiday-text">{holiday.destination}</h1>
                    <p className="holiday-text">{holiday.type}</p>
                    <p className='holiday-text'>{holiday.duration}</p>
                    {holiday.holidayMakers.map(holidayMaker => (
                        <p className='holidayMaker-text' key={holidayMaker.id}>{holidayMaker.name}</p>
                    ))}
                    <div className='holiday-buttons'>
                        <button 
                            className='deleteButton' 
                            onClick={() => confirmDelete(holiday.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
)
}