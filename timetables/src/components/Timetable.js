import React from 'react';

export default function Timetable(props) {
  let title;
  if (props.title === 0) {
    title = "Title is moduled"
  } else {
    title = "Title is not moduled!"
  }
    return <h2>{title}</h2>
}
