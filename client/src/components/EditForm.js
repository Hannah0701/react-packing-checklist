import React, { useState, useEffect } from 'react';
import apiURL from '../api';

export const EditForm = (props) => {
    const [numPeople, setNumPeople] = useState(1);
    const [data, setData] = useState({
        destination: '',
        holidayMakers: [{
            name: '',
            age: ''
        }],
        holidayType: 'beach',
        duration: '',
    });

    useEffect(() => {
        // Fetch the holiday data and prepopulate the form
        const fetchHolidayData = async () => {
            try {
                const response = props.sharedData
                if (response.ok) {
                    const holidayData = await response.json();
                    setData(holidayData);
                    setNumPeople(holidayData.holidayMakers.length);
                } else {
                    console.log('Failed to fetch holiday data');
                }
            } catch (error) {
                console.log('Error fetching holiday data:', error);
            }
        };

        fetchHolidayData();
    }, [props.sharedData]);

    function closeForm() {
      props.setEditForm(false)
    }

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        props.setIsHolidaysPage(false);
        props.setIsOutputPage(true);
        props.setSharedData(data);

        try {
            const response = await fetch(`${apiURL}/holidays/${props.holidayId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                console.log('Failed to update holiday and holiday makers');
            } else {
                console.log('Holiday and holiday makers updated');
            }
        } catch (error) {
            console.log('Error updating holiday and holiday makers:', error);
        }
    };

    const handleNumPeopleChange = (e) => {
        const newNumPeople = parseInt(e.target.value);
        setNumPeople(newNumPeople);

        if (newNumPeople > data.holidayMakers.length) {
            const diff = newNumPeople - data.holidayMakers.length;
            const newHolidayMakers = [...data.holidayMakers];

            for (let i = 1; i <= diff; i++) {
                newHolidayMakers.push({ name: "", age: "" });
            }

            setData({ ...data, holidayMakers: newHolidayMakers });
        } else {
            setData({ ...data, holidayMakers: data.holidayMakers.slice(0, newNumPeople) });
        }
    };

    return (
        <div className="overlay">
            <div className="editFormOverlay">
                <button
                    type="button"
                    className="backButton"
                    onClick={closeForm}
                >
                    Close form
                </button>
                <div className="editForm">
                    <h1>Edit Packing Checklist</h1>
                    <h2>Edit your holiday details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="edit-form-box">
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
                            <button type="submit">{'Update Checklist'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
