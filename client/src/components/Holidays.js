import React, { useState, useEffect } from 'react';
import city from "../assets/city.png";
import beach from "../assets/beach.png";
import camping from "../assets/camping.png";
import adventure from "../assets/adventure.png";
import multiDestination from "../assets/multiDestination.png";
import apiURL from '../api';

export const Holidays = (props) => {
  const [holidays, setHolidays] = useState([]);

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
      <button 
          className='refreshButton' 
          onClick={fetchHolidays}
      >
          Refresh Database
      </button>
      <main className='content'>
        <div className="page-image-header">
          <h1>Holidays Database</h1>
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
                    <img className="holiday-img" src={imageType} alt="Holiday type image" id="icon" width="200px" height="200px" border-radius="20px" />
                  </div>
                  <div className="holiday-details">
                    <h2>{holiday.destination}</h2>
                    <p>{holiday.duration} days</p>
                    {/* <div className="holidayMakers">
                        {holiday[holiday.id].holidayMaker.map(holidayMaker => (
                            <div key={holidayMaker.id}>
                                <li>{holidayMaker.name}</li>
                                <li>{holidayMaker.age}</li>
                            </div>
                        ))}
                    </div> */}
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
