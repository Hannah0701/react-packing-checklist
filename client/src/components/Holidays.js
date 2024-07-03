import React, { useState, useEffect } from 'react';

import apiURL from '../api';
import { Holiday } from './Holiday';
import { EditForm } from './EditForm';

export const Holidays = (props) => {
  const [holidays, setHolidays] = useState([]);

  async function viewChecklist(holidayId) {
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
            props.setIsHolidaysPage(false);
            props.setIsOutputPage(true);
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
            props.setEditForm(true);
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

  async function deleteHoliday(holidayId) {
    try {
      const res = await fetch(`${apiURL}/holidays/${holidayId}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        // keep all the holidays except the one we want to delete
       const filteredHolidays = holidays.filter(holiday => holiday.id !== holidayId);
       setHolidays(filteredHolidays);
      } else {
        throw new Error('Failed to delete item');
      }

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

      fetchHolidays();
  } ,[]);

  if (props.editForm) {
    return (
      <div className="editform-container">
      {holidays.map(holiday =>
        <EditForm holiday={holiday}
                setEditForm={props.setEditForm}
                sharedData={props.sharedData}
                setSharedData={props.setSharedData}
                key={"editForm" + holiday.id}
        />
       )}
      </div>
    )
  }

  return ( 
    <div className="holiday-page">
      <button 
        type="button"
        className="backButton" 
        onClick={props.goHome}
      >
          Go back
      </button>
      <main className='content'>
        <div className="page-image-header">
          <h1>Holidays Database</h1>
          <p>Access to all your stored holiday data ready to regenerate your checklist, edit or delete your input!</p>
        </div>
        <div className="holidays">
          <div className="holiday-box">
            {holidays.map(holiday => 
            <Holiday holiday={holiday} 
                     confirmDelete={confirmDelete} 
                     viewChecklist={viewChecklist} 
                     editHoliday={editHoliday}
                     setIsOutputPage={props.setIsOutputPage} 
                     setIsHolidaysPage={props.setIsHolidaysPage} 
                     setSharedData={props.setSharedData}
                     key={"holiday" + holiday.id}
            />
          )}
          </div>
        </div>
      </main>
    </div>
  )
}
