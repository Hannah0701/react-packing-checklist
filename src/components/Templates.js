import React, { useState } from 'react'

export const Templates = (props) => {
    return (
      <div classname="templatesPage">
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
            <div className="template-box">
            </div>
          </div>
      </div>
    );

}
