import React, { useState } from 'react'

export const Form = (props) => {
    const [data, setData] = useState({
        destination: '',
        num_people: '',
        people: [{name: '', age: ''}],
        type_of_hol: '',
        duration: '',
    })

    function handleChange(event) {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.addPage(data)
    };
  return (
    <div classname="formPage">
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
                  <p>
                      <label htmlFor="destination">
                          Destination: 
                          <input 
                            type="text" 
                            name="destination" 
                            id="destination" 
                            value={data.destination} 
                            onChange={handleChange} 
                          />
                      </label>
                  </p>
                      <p>
                      <label htmlFor="num_people">
                          Number of people: 
                          <textarea 
                            name="num_people" 
                            id="num_people" 
                            value={data.num_people} 
                            onChange={handleChange} 
                          />
                      </label>
                  </p>
                  <p>
                      <label htmlFor="people">
                          Details of person 1: 
                          <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            value={data.name} 
                            onChange={handleChange} 
                          />
                      </label>
                  </p>
                  <p>
                      <label htmlFor="type_of_hol">
                          Type of holiday: 
                          <input 
                            type="text" 
                            name="type_of_hol" 
                            id="type_of_hol" 
                            value={data.type_of_hol}
                            onChange={handleChange} 
                          />
                      </label>
                  </p>
                  <p>
                      <label htmlFor="duration">
                          Tags: 
                          <input 
                            type="text" 
                            name="tags" 
                            id="tags" 
                            value={data.tags} 
                            onChange={handleChange} 
                          />
                      </label>
                  </p>
                  <button type="submit">Generate Checklist</button>
              </form>
        </div>
        <div className="form-image-side"></div>
    </div>
  );
};
