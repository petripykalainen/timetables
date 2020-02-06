import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo';

const ROUTE_QUERY = gql`
query GET_ROUTE($from: String, $to: String){
  plan(
    fromPlace: $from,
    toPlace: $to
  ) {
    itineraries{
      startTime
      legs {
        mode
        route{
          longName
          shortName
        }
        startTime
        endTime
        from {
          name
          stop {
            code
            name
            vehicleMode
          }
        }
        to {
          name
          stop{
            name
            code
          }
        }
      }
    }
  }
}
`;

const addLeadingZeroes = (time) => {
  return (time > 10 ? '':'0')+time;
}

const renderTimetable = (itineraries) => {
  let counter = 0;

  return itineraries.map((route) => {
    counter++;
    return (
      <li key={route.startTime}>
        <div>
          <h1>Route: {counter}</h1>
          <p>Departs at: {new Date(route.legs[1].startTime).toLocaleTimeString()}</p>
          <p>Mode: {route.legs[1].mode}: {route.legs[1].route.shortName} <br/> From stop: {route.legs[1].from.stop.code}, {route.legs[1].from.stop.name}</p>
          <h2>Steps:</h2>
          
            {
              route.legs.map((step, stepindex) => {
                let from, to;

                if (!step.route) {
                  from = step.from.name
                  to = step.to.name
                }
                else {
                  from = `stop ${step.from.stop.code}, ${step.from.stop.name}`;
                  to = `stop ${step.to.stop.code}, ${step.to.stop.name}`;
                }
                return (
                  <div key={step.startTime}>
                    <p>Step {stepindex+1}</p>
                    <p>
                      {addLeadingZeroes(new Date(step.startTime).getHours())}
                      :{addLeadingZeroes(new Date(step.startTime).getMinutes())}
                      ...
                      {addLeadingZeroes(new Date(step.endTime).getHours())}
                      :{addLeadingZeroes(new Date(step.endTime).getMinutes())}
                    </p>
                    <p>From {from} to {to} via {step.mode} {step.route ? step.route.shortName : ''}</p>
                  </div>
                )
              })
            }
        </div>
      </li>
    )
  })
}

export default function Timetable({from, to, title}){
  const {loading, error, data} = useQuery(
    ROUTE_QUERY,
    {
      variables: {from, to}
    }
  );
  
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error! {error}</h1>;
  }
  let style = {
    float: "left",
    padding: "0 30px",
    margin: "0 auto 50px"
  }
  return (
    <div style={style}>
      <h1>{title}</h1>
      <ul>
        {renderTimetable(data.plan.itineraries)}
      </ul>
    </div>
  )
}
