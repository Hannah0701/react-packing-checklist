import React, {useState, useEffect} from 'react';
import apiURL from "../api";
import city from "../assets/city.png";
import beach from "../assets/beach.png";
import camping from "../assets/camping.png";
import adventure from "../assets/adventure.png";
import multiDestination from "../assets/multiDestination.png";
import person from "../assets/person.png";
import {EditForm} from "./EditForm";

export const Holiday = ({ holiday, ...props }) => {
        const [editForm, setEditForm] = useState(false);
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

        async function editHoliday(holidayId) {
          try {
            const resHoliday = await fetch(`${apiURL}/holidays/${holidayId}`, {
              method: 'GET'
            })
            if (resHoliday.ok) {
              const resHolidayMakers = await fetch(`${apiURL}/holidays/${holidayId}/holidayMakers`, {
                  method: 'GET'
              })
              if (resHolidayMakers.ok) {
                  const holidayData = await resHoliday.json();
                  const holidayMakersData = await resHolidayMakers.json();
                  const holidayDataWithMakers = {...holidayData, holidayMakers: holidayMakersData};
                  props.setSharedData({
                      destination: holidayDataWithMakers.destination,
                      holidayMakers: holidayDataWithMakers.holidayMakers,
                      holidayType: holidayDataWithMakers.holidayType,
                      duration: holidayDataWithMakers.duration
                  });
                  setEditForm(true);
              } else {
                  throw new Error('Failed to fetch items');
              }
            } else { 
                throw new Error('Failed to fetch items');
            }
          } catch (err) {
            console.log('Oh no an error! ', err)
          }
        }

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

        if (editForm) {
          return (
            <div className="editform-container">
              <EditForm holiday={holiday}
                      setEditForm={setEditForm}
                      setSharedData={props.setSharedData}
                      setIsHolidaysPage={props.setIsHolidaysPage}
                      setIsOutputPage={props.setIsOutputPage} 
                      holidayMakers={holidayMakers}
                      key={"editForm" + holiday.id}
              />
            </div>
          )
        }

        return (
          <div className="holiday" key={holiday.id}>
            <div className="holiday-image">
              <img className="holiday-img" src={imageType} alt="Holiday type" id="icon" width="200px" height="200px" />
            </div>
            <div className="holiday-details">
              <h2>{holiday.destination}</h2>
              <p>{holiday.duration} days</p>
              <div className="holidayMakers">
                  {holidayMakers.map(holidayMaker => (
                      <div className="holidayMaker" key={holidayMaker.id}>
                          <img src={person} alt="Person" id="icon" width="40px" height="40px" />
                          <p>{holidayMaker.name}</p>
                          <p>{holidayMaker.age}</p>
                      </div>
                  ))}
              </div>
            </div>
            <div className="holiday-buttons">
              <button 
                className='viewButton' 
                onClick={() => props.viewChecklist(holiday.id)}
              >
                  Regenerate checklist
              </button>
              <button 
                className='editButton' 
                onClick={() => editHoliday(holiday.id)}
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