import React from 'react';
import {useQuery} from 'react-apollo';

import ROUTE_QUERY from './queries/routequery';

const addLeadingZeroes = (time) => {
  return (time > 10 ? '':'0')+time;
}

const renderTimetable = (itineraries) => {
  let counter = 0;

  return itineraries.map((route) => {
    counter++;
    return (
      <li>
          <li key={route.startTime}>
            <div className="uk-card uk-card-body uk-card-default">
            <h1 className="uk-card-title">Route {counter}</h1>
            <p>Departs at: {new Date(route.legs[1].startTime).toLocaleTimeString()}</p>
            <p>Mode: {route.legs[1].mode}: {route.legs[1].route.shortName} <br/> From stop: {route.legs[1].from.stop.code}, {route.legs[1].from.stop.name}</p>
              <h1 className="uk-card-title">Steps:</h1>
              
        </div>  
          </li>
      </li>
      // <li key={route.startTime}>
      //   <h1>Route: {counter}</h1>
      //   <div>
      // <p>Departs at: {new Date(route.legs[1].startTime).toLocaleTimeString()}</p>
      // <p>Mode: {route.legs[1].mode}: {route.legs[1].route.shortName} <br/> From stop: {route.legs[1].from.stop.code}, {route.legs[1].from.stop.name}</p>
      //     <h2>Steps:</h2>
      
      //     {

      //       route.legs.map((step, stepindex) => {
      //         let from, to;

      //         if (!step.route) {
      //           from = step.from.name
      //           to = step.to.name
      //         }
      //         else {
      //           from = `stop ${step.from.stop.code}, ${step.from.stop.name}`;
      //           to = `stop ${step.to.stop.code}, ${step.to.stop.name}`;
      //         }
      //         return (
      //           <div key={step.startTime}>
      //             <p>Step {stepindex+1}</p>
      //             <p>
      //               {addLeadingZeroes(new Date(step.startTime).getHours())}
      //               :{addLeadingZeroes(new Date(step.startTime).getMinutes())}
      //               ...
      //               {addLeadingZeroes(new Date(step.endTime).getHours())}
      //               :{addLeadingZeroes(new Date(step.endTime).getMinutes())}
      //             </p>
      //             <p>From {from} to {to} via {step.mode} {step.route ? step.route.shortName : ''}</p>
      //           </div>
      //         )
      //       })
      //     }
      //   </div>
      // </li>

    )
  })
}

export default function Timetable({from, to, title}){
  const {loading, error, data} = useQuery(
    ROUTE_QUERY,
    {
      variables: {from, to},
      pollInterval: 1000*60
    }
  );
  
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error! {error}</h1>;
  }

  return (
    <div className="uk-width-1-2 uk-color">
      <h3>{from.split('::')[0]} <br/>&#8594; {to.split('::')[0]}</h3>
      <ul className="uk-list">
        {renderTimetable(data.plan.itineraries)}
      </ul>
    </div>

  );
}
