import React from 'react';

import addLeadingZeroes from './utilities/addLeadingZeroes';

export default function Clock({time}) {
  return (
    <div className="uk-text-align-center uk-background-secondary uk-light uk-padding uk-panel">
      <div className="uk-text-center uk-container">
        <h1>Great big timetable</h1>
        <h1>{addLeadingZeroes(new Date(time).getHours())}
          :{addLeadingZeroes(new Date(time).getMinutes())}</h1>
      </div>
    </div>
    
  )
}
