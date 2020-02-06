import React from 'react';

export default function Clock({time}) {
  console.log(new Date(time).getHours())
  let style = {
    margin: "auto",
    width: "60%",
    border: "3px solid #73AD21",
    padding: "10px",
    textAlign: "center"
    
  }
  return (
    <div style={style}>
      <h1>Great big timetable</h1>
      <h1>{new Date(time).getHours()}:{new Date(time).getMinutes()}</h1>
    </div>    
  )
}
