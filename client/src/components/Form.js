import React, { useState } from 'react'
import apiURL from '../api'

export const Form = (props) => {
    const [numPeople, setNumPeople] = useState(1);
    const [data, setData] = useState({
        destination: '',
        numPeople: numPeople,
        holidayMakers: [{
          name: '', 
          age: ''
        }],
        holidayType: 'beach',
        duration: '',
    })

    const handleChange = (event) => {
      setData({
          ...data,
          [event.target.name]: event.target.value
      });
    };

    const handleHolidayMakerChange = (e, index) => {
      const newHolidayMakers = [...data.holidayMakers];
      newHolidayMakers[index][e.target.name] = e.target.value;
      setData({
        ...data,
        holidayMakers: newHolidayMakers,
      });
    };
  
    // const addHolidayMaker = () => {
    //   setData({
    //     ...data,
    //     holidayMakers: [...data.holidayMakers, { name: '', age: '' }],
    //   });
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        props.setIsBespokePage(false);
        props.setIsOutputPage(true);
        props.setSharedData(data);

        const response = await fetch(`${apiURL}/holidays`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          console.log('Failed to create holiday and holiday makers');
        } else {
          console.log('Holiday and holiday makers created');
        }
    };

    const handleNumPeopleChange = (e) => {
        const newNumPeople = parseInt(e.target.value);
        setNumPeople(newNumPeople);
    
        if (newNumPeople > data.holidayMakers.length) {
          const diff = newNumPeople - data.holidayMakers.length;
          const newholidayMakers = [...data.holidayMakers];
    
          for (let i = 1; i <= diff; i++) {
            newholidayMakers.push({ name: "", age: "" });
          }
    
          setData({ ...data, holidayMakers: newholidayMakers });
        } else {
          setData({ ...data, holidayMakers: data.people.slice(0, newNumPeople) });
        }
    };

  return (
    <div className="formPage">
        <button 
          type="button"
          className="backButton" 
          onClick={props.goHome}
        >
            Go back
        </button>
        <div className="form">
              <h1>Bespoke Packing Checklist</h1>
              <h2>Tell us about your holiday so we can generate checklists for everyone going</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-box">
                  <p>
                      <label htmlFor="destination">
                          Destination: 
                      </label>
                      <input 
                        type="text" 
                        name="destination" 
                        id="destination" 
                        value={data.destination} 
                        onChange={handleChange} 
                        placeholder='A country or city e.g. Japan, Berlin, USA'
                        required
                      />
                  </p>
                  <p>
                      <label htmlFor="numPeople">
                          Number of people: 
                      </label>
                      <input 
                        type="number"
                        name="numPeople" 
                        id="numPeople" 
                        value={numPeople} 
                        onChange={handleNumPeopleChange} 
                        required
                      />
                  </p>
                  {data.holidayMakers.map((maker, index) => (
                    <div className="people" key={index}>
                      <p>Person {index + 1} details</p>
                      <input
                        type="text"
                        name="name"
                        value={maker.name}
                        onChange={(e) => handleHolidayMakerChange(e, index)}
                        placeholder={`Person ${index + 1} name`}
                        required
                      />
                      <input
                        type="number"
                        name="age"
                        value={maker.age}
                        onChange={(e) => handleHolidayMakerChange(e, index)}
                        placeholder={`Person ${index + 1} age`}
                        required
                      />
                    </div>
                  ))}
                  <p>
                      <label htmlFor="holidayType">
                          Type of holiday: 
                      </label>
                      <select 
                        type="text" 
                        name="holidayType" 
                        id="holidayType" 
                        value={data.holidayType}
                        onChange={handleChange} 
                        required
                      >
                        <option value="beach">Beach / resort holiday</option>
                        <option value="city">City break</option>
                        <option value="camping">Camping holiday</option>
                        <option value="adventure">Adventure holiday</option>
                        <option value="multiDestination">Travel around multiple destinations</option>
                      </select>
                  </p>
                  <p>
                      <label htmlFor="duration">
                          Number of holiday days: 
                      </label>
                      <input 
                        type="number" 
                        name="duration" 
                        id="duration" 
                        value={data.duration} 
                        onChange={handleChange} 
                        placeholder='Number of days e.g. 7, 14, 30'
                        required
                      />
                  </p>
                  <button type="submit">{'Generate Checklist'}</button>
                </div>
              </form>
        </div>
        <div className="form-image-side"></div>
    </div>
  );
};
