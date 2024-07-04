import './App.css';
import React, { useState, useEffect } from 'react'
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Form } from './components/Form';
import { Templates } from './components/Templates';
import { Output } from './components/Output';
import { Footer } from './components/Footer';
import { Holidays } from './components/Holidays';
import apiURL from './api';

function App() {
  const [isBespokePage, setIsBespokePage] = useState(false);
  const [isTemplatesPage, setIsTemplatesPage] = useState(false);
  const [isOutputPage, setIsOutputPage] = useState(false);
  const [isHolidaysPage, setIsHolidaysPage] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [sharedData, setSharedData] = useState(null);
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

  function goHome() {
    setIsBespokePage(false)
    setIsTemplatesPage(false)
    setIsOutputPage(false)
    setIsHolidaysPage(false)
    setEditForm(false)
    setSharedData(null)
  }

  function goToHolidays() {
    setIsBespokePage(false)
    setIsTemplatesPage(false)
    setIsOutputPage(false)
    setIsHolidaysPage(true)
    setEditForm(false)
    setSharedData(null)
  }

  useEffect(() => {
    if (isBespokePage) {
      document.title = `Bespoke Packing Checklist Form`
    } else if (isTemplatesPage) {
      document.title = 'Preset Packing Checklist Templates'
    } else if (isOutputPage) {
      document.title = 'Generated Packing Checklist'
    } else if (isHolidaysPage) {
      document.title = 'Holidays Database'
    } else {
      document.title = 'Packing Checklist Homepage'
    }
  }, [isBespokePage, isTemplatesPage, isOutputPage, isHolidaysPage])
  
  if (isBespokePage) {
    return (
      <div className="App">
        <Header 
          goToHolidays={goToHolidays}
          holidays={holidays}
        />
        <Form  
          goHome={goHome} 
          setIsBespokePage={setIsBespokePage}
          setIsOutputPage={setIsOutputPage}
          setSharedData={setSharedData}
        />
        <Footer />
      </div>
    )
  }
  
  if (isTemplatesPage) {
    return (
      <div className="App">
        <Header 
          goToHolidays={goToHolidays}
          holidays={holidays}
        />
        <Templates  
          goHome={goHome} 
          setIsTemplatesPage={setIsTemplatesPage}
          setIsOutputPage={setIsOutputPage}
          setSharedData={setSharedData}
        />
        <Footer />
      </div>
    )
  }

  if (isOutputPage) {
    return (
      <div className="App">
        <Header 
          goToHolidays={goToHolidays}
          holidays={holidays}
        />
        <Output  
          goHome={goHome}
          sharedData={sharedData}
        />
        <Footer />
      </div>
    )
  }

  if (isHolidaysPage) {
    return (
      <div className="App">
        <Header 
          goToHolidays={goToHolidays}
          holidays={holidays}
        />
        <Holidays  
          goHome={goHome}
          fetchHolidays={fetchHolidays}
          sharedData={sharedData}
          setSharedData={setSharedData}
          setIsHolidaysPage={setIsHolidaysPage}
          setIsOutputPage={setIsOutputPage}
          editForm={editForm}
          setEditForm={setEditForm}
        />
        <Footer />
      </div>
    )
  }
  
  return (
    <div className="App">
      <Header 
          goToHolidays={goToHolidays}
          holidays={holidays}
      />
      <Main
        setIsBespokePage={setIsBespokePage}
        setIsTemplatesPage={setIsTemplatesPage}
      />
      <Footer />
    </div>
  );
}

export default App;
