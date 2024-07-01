import React, { useState, useEffect } from 'react';
import city from "../assets/city.png";
import beach from "../assets/beach.png";
import camping from "../assets/camping.png";
import adventure from "../assets/adventure.png";
import multiDestination from "../assets/multiDestination.png";
import apiURL from '../api';

export const Holidays = (props) => {
  const [holidays, setHolidays] = useState([]);
//   const [holidayMakers, setHolidayMakers] = useState([]);

  async function fetchHolidays(){
      try {
          const response = await fetch(`${apiURL}/holidays`);
  
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
          const holidayData = await response.json();
          setHolidays(holidayData);
      } catch (err) {
          console.log("Oh no an error! ", err)
      }
  }

  async function deleteHoliday (holidayId) {
    try {
      const res = await fetch(`${apiURL}/holidays/${holidayId}`, {
        method: 'DELETE'
      })
      await res.json()
      fetchHolidays()

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

  useEffect(() => {
      fetchHolidays();
  } ,[]);

  return ( 
    <div className="holiday-page">
      <button 
        type="button"
        className="backButton" 
        onClick={props.goHome}
      >
          Go back
      </button>
      {/* <button 
          className='refreshButton' 
          onClick={fetchHolidays}
      >
          Refresh Database
      </button> */}
      <main className='content'>
        <div className="page-image-header">
          <h1>Holidays Database</h1>
          <p>Access to all your stored holiday data ready to regenerate your checklist, edit or delete your input!</p>
        </div>
        <div className="holidays">
          <div className="holiday-box">
            {holidays.map(holiday => {
              let imageType;
              if (holiday.holidayType === "city") {
                imageType = city;
              } else if (holiday.holidayType === "camping") {
                imageType = camping;
              } else if (holiday.holidayType === "adventure") {
                imageType = adventure;
              } else if (holiday.holidayType === "multiDestination") {
                imageType = multiDestination;
              } else {
                imageType = beach;
              }

              return (
                <div className="holiday" key={holiday.id}>
                  <div className="holiday-image">
                    <img className="holiday-img" src={imageType} alt="Holiday type" id="icon" width="200px" height="200px" border-radius="20px" />
                  </div>
                  <div className="holiday-details">
                    <h2>{holiday.destination}</h2>
                    <p>{holiday.duration} days</p>
                    <div className="holidayMakers">
                        {/* {holiday.holidayMakers.map(holidayMaker => (
                            <div key={holidayMaker.id}>
                                <li>{holidayMaker.name}</li>
                                <li>{holidayMaker.age}</li>
                            </div>
                        ))} */}
                    </div>
                  </div>
                  <div className="holiday-buttons">
                    <button 
                      className='viewButton' 
                      onClick={() => props.viewHoliday(holiday)}
                    >
                        View checklist
                    </button>
                    <button 
                      className='editButton' 
                      onClick={() => props.editHoliday(holiday)}
                    >
                        Edit
                    </button>
                    <button 
                      className='deleteButton' 
                      onClick={() => confirmDelete(holiday.id)}
                    >
                        Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
