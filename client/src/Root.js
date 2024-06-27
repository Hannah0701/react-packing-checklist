import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Holiday } from './components/Holiday';
import { Holidays } from './components/Holidays';
import { HolidayMaker } from './components/HolidayMaker.js';
import { HolidayMakers } from './components/HolidayMakers';
import { App } from './App';
import apiURL from './api';

export const Root = () => {
  const [holidays, setHolidays] = useState([]);
  const [holidayMakers, setHolidayMakers] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [selectedHolidayMaker, setSelectedHolidayMaker] = useState(null);
  const [formIsActive, setFormIsActive] = useState(false);

  async function fetchHolidays(){
    console.count('root rerendered')
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

  async function fetchHolidayMakers(){
    console.count('root rerendered')
		try {
			const response = await fetch(`${apiURL}/holidayMakers`);

      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
			const holidayMakersData = await response.json();
			setHolidayMakers(holidayMakersData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App fetchHolidays={fetchHolidays}/>}>
          <Route index element={<Holidays 
            holidays={holidays}
            setHolidays={setHolidays}
            fetchHolidays={fetchHolidays} 
            selectedHoliday={selectedHoliday}
            setSelectedHoliday={setSelectedHoliday}
            formIsActive={formIsActive}
            setFormIsActive={setFormIsActive}
          />}/>
          <Route path='holiday' element={<Holiday 
            holidays={holidays}
            setHolidays={setHolidays}
            fetchHolidays={fetchHolidays} 
            selectedHoliday={selectedHoliday}
            setSelectedHoliday={setSelectedHoliday}
            formIsActive={formIsActive}
            setFormIsActive={setFormIsActive}
          />}/>
        </Route>
        <Route path='/' element={<App fetchHolidayMakers={fetchHolidays}/>}>
          <Route index element={<HolidayMakers 
            holidayMakers={holidayMakers} 
            fetchHolidayMakers={fetchHolidayMakers} 
            selectedHolidayMaker={selectedHolidayMaker}
            setSelectedHolidayMaker={setSelectedHolidayMaker}
            formIsActive={formIsActive}
            setFormIsActive={setFormIsActive}
          />}/>
          <Route path='holidayMaker' element={<HolidayMaker 
            fetchHolidayMakers={fetchHolidayMakers} 
            selectedHolidayMaker={selectedHolidayMaker}
            setSelectedHolidayMaker={setSelectedHolidayMaker}
            formIsActive={formIsActive}
            setFormIsActive={setFormIsActive}
          />}/>
        </Route>
      </Routes>
    </Router>
  )
}
