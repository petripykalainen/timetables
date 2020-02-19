import React from 'react';

export default function Clock({time}) {
  console.log(new Date(time).getHours())
  return (
    <div className="uk-text-align-center uk-background-secondary uk-light uk-padding uk-panel">
      <div className="uk-text-center uk-container">
        <h1>Great big timetable</h1>
        <h1>{new Date(time).getHours()}:{new Date(time).getMinutes()}</h1>
      </div>
    </div>
    
  )
}
