import React, {useState, useEffect} from 'react';
import apiURL from "../api";
import city from "../assets/city.png";
import beach from "../assets/beach.png";
import camping from "../assets/camping.png";
import adventure from "../assets/adventure.png";
import multiDestination from "../assets/multiDestination.png";

export const Holiday = ({ holiday, ...props }) => {
        const [holidayMakers, setHolidayMakers] = useState([]);

        useEffect(() => {
            async function fetchHolidayMakers() {
                try {
                    const response = await fetch(`${apiURL}/holidays/${holiday.id}/holidayMakers`);

                    if (!response.ok) {
                        throw new Error('Failed to fetch items');
                    }

                    const holidayMakersData = await response.json();
                    setHolidayMakers(holidayMakersData);
                } catch (err) {
                    console.log("Oh no an error! ", err)
                }
            }

            fetchHolidayMakers();
        }, [holiday.id]);

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
                  {holidayMakers.map(holidayMaker => (
                      <div key={holidayMaker.id}>
                          <li>{holidayMaker.name}</li>
                          <li>{holidayMaker.age}</li>
                      </div>
                  ))}
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
                onClick={() => props.confirmDelete(holiday.id)}
              >
                  Delete
              </button>
            </div>
          </div>
        );
};