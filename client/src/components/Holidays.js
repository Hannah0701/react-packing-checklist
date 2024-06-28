import React, { useState, useEffect } from 'react';
import { Form } from './Form';

export const Holidays = ({ 
  holidays, 
  fetchHolidays, 
  selectedHoliday, 
  setSelectedHoliday,
  formIsActive,
  setFormIsActive
}) => {

	useEffect(() => {
		fetchItems();
	}, []);

  return (
    <main className='content'>
			<Holidays 
              holidays={holidays} 
              fetchHolidays={fetchHolidays} 
              setSelectedHoliday={setSelectedHoliday}
              setFormIsActive={setFormIsActive}
            />

      {formIsActive && 
        <Form 
          setFormIsActive={setFormIsActive}
          selectedHoliday={selectedHoliday}
          fetchHolidays={fetchHolidays} 
        />
      }
    </main>
  )
}