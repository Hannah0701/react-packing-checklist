import React from 'react'

export const Templates = (props) => {

    const handleClickTwoDay = (event) => {
        event.preventDefault();
        props.setIsTemplatesPage(false);
        props.setIsOutputPage(true);
        props.setSharedData({
            destination: 'Anywhere',
            numPeople: '1',
            people: [{name: '2-4 Days', age: '40'}],
            holidayType: 'beach',
            duration: '4',
        });
    };

    const handleClickWeek = (event) => {
        event.preventDefault();
        props.setIsTemplatesPage(false);
        props.setIsOutputPage(true);
        props.setSharedData({
            destination: 'Anywhere',
            numPeople: '1',
            people: [{name: '1 Week', age: '40'}],
            holidayType: 'beach',
            duration: '7',
        });
    };

    const handleClickTwoWeek = (event) => {
        event.preventDefault();
        props.setIsTemplatesPage(false);
        props.setIsOutputPage(true);
        props.setSharedData({
            destination: 'Anywhere',
            numPeople: '1',
            people: [{name: '2 Weeks', age: '40'}],
            holidayType: 'beach',
            duration: '14',
        });
    };

    const handleClickMonth = (event) => {
        event.preventDefault();
        props.setIsTemplatesPage(false);
        props.setIsOutputPage(true);
        props.setSharedData({
            destination: 'Anywhere',
            numPeople: '1',
            people: [{name: '1 Month', age: '40'}],
            holidayType: 'beach',
            duration: '30',
        });
    };

    const handleClickCity = (event) => {
        event.preventDefault();
        props.setIsTemplatesPage(false);
        props.setIsOutputPage(true);
        props.setSharedData({
            destination: 'Anywhere',
            numPeople: '1',
            people: [{name: 'City break', age: '40'}],
            holidayType: 'city',
            duration: '5',
        });
    };

    const handleClickCamping = (event) => {
        event.preventDefault();
        props.setIsTemplatesPage(false);
        props.setIsOutputPage(true);
        props.setSharedData({
            destination: 'Anywhere',
            numPeople: '1',
            people: [{name: 'Camping Holiday', age: '40'}],
            holidayType: 'camping',
            duration: '10',
        });
    };

    const handleClickBeach = (event) => {
        event.preventDefault();
        props.setIsTemplatesPage(false);
        props.setIsOutputPage(true);
        props.setSharedData({
            destination: 'Anywhere',
            numPeople: '1',
            people: [{name: 'Beach / Resort Holiday', age: '40'}],
            holidayType: 'beach',
            duration: '14',
        });
    };

    const handleClickAdventure = (event) => {
        event.preventDefault();
        props.setIsTemplatesPage(false);
        props.setIsOutputPage(true);
        props.setSharedData({
            destination: 'Anywhere',
            numPeople: '1',
            people: [{name: 'Adventure Holiday', age: '40'}],
            holidayType: 'adventure',
            duration: '14',
        });
    };

    return (
      <div className="templatesPage">
          <button 
            type="button"
            className="backButton" 
            onClick={props.goHome}
          >
              Go back
          </button>
          <div className="templates">
            <div className="template-image-header">
              <h1>Preset Checklists</h1>
              <p>Checklists already designed for specific occasions!</p>
            </div>
            <div className="templates-box">
              <div className="template">  
                <div className='two-to-four-checklist-box'>
                  <button className="two-to-four-box-button" onClick={handleClickTwoDay}></button>
                  <div className="template-details">
                    <h3>2-4 Day Checklist</h3>
                    <p>Generic 2 - 4 day holiday packing checklist</p>
                  </div>
                </div>
              </div>
              <div className="template">  
                <div className='week-checklists-box'>
                  <button className="week-box-button" onClick={handleClickWeek}></button>
                  <div className="template-details">
                      <h3>1 Week Checklist</h3>
                      <p>Generic 1 week holiday packing checklist</p>
                  </div>
                </div>
              </div>
              <div className="template">  
                <div className='two-week-checklists-box'>
                  <button className="two-week-box-button" onClick={handleClickTwoWeek}></button>
                  <div className="template-details">
                      <h3>2 Week Checklist</h3>
                      <p>Generic 2 week holiday packing checklist</p>
                  </div>
                </div>
              </div>
              <div className="template">  
                <div className='month-checklists-box'>
                  <button className="month-box-button" onClick={handleClickMonth}></button>
                  <div className="template-details">
                      <h3>1 Month Checklist</h3>
                      <p>Generic 1 month holiday packing checklist</p>
                  </div>
                </div>
              </div>
              <div className="template">  
                <div className='city-checklists-box'>
                  <button className="city-box-button" onClick={handleClickCity}></button>
                  <div className="template-details">
                      <h3>City Break Checklist</h3>
                      <p>Generic city break holiday packing checklist</p>
                  </div>
                </div>
              </div>
              <div className="template">  
                <div className='camping-checklists-box'>
                  <button className="camping-box-button" onClick={handleClickCamping}></button>
                  <div className="template-details">
                      <h3>Camping Checklist</h3>
                      <p>Generic camping holiday packing checklist</p>
                  </div>
                </div>
              </div>
              <div className="template">  
                <div className='beach-checklists-box'>
                  <button className="beach-box-button" onClick={handleClickBeach}></button>
                  <div className="template-details">
                      <h3>Beach Checklist</h3>
                      <p>Generic beach holiday packing checklist</p>
                  </div>
                </div>
              </div>
              <div className="template">  
                <div className='adventure-checklists-box'>
                  <button className="adventure-box-button" onClick={handleClickAdventure}></button>
                  <div className="template-details">
                      <h3>Adventure Checklist</h3>
                      <p>Generic adventure holiday packing checklist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );

}
