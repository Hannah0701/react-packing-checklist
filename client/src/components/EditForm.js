import React, { useState } from 'react';
import apiURL from '../api';

export const EditForm = (props) => {
    const [numPeople, setNumPeople] = useState(props.sharedData.holidayMakers.length);
    const [data, setData] = useState({
        destination: props.sharedData.destination,
        holidayMakers: props.sharedData.holidayMakers,
        holidayType: props.sharedData.holidayType,
        duration: props.sharedData.duration,
    });

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        props.setSharedData(data);

        try {
            const response = await fetch(`${apiURL}/holidays/${props.holiday.id}`, {
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

        props.setIsHolidaysPage(false);
        props.setEditForm(false)
        props.setIsOutputPage(true);
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
                                    placeholder={data.destination ? data.destination : 'A country or city e.g. Japan, Berlin, USA'}
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
                                    placeholder={numPeople}
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
                                        placeholder={maker.name ? maker.name : `Person ${index + 1} name`}
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="age"
                                        value={maker.age}
                                        onChange={(e) => handleHolidayMakerChange(e, index)}
                                        placeholder={maker.age ? maker.age : `Person ${index + 1} age`}
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
                                    placeholder={data.holidayType ? data.holidayType : 'beach'}
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
                                    placeholder={data.duration ? data.duration : 'Number of days e.g. 7, 14, 30'}
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
