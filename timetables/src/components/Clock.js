import React from 'react';

export default function Clock(props) {
  return <h1>{props.time.toLocaleTimeString()}</h1>
}
