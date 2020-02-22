import React from 'react';
import {useQuery} from 'react-apollo';

import ROUTE_QUERY from './queries/routequery';
import addLeadingZeroes from './utilities/addLeadingZeroes';

const renderTimetable = (itineraries) => {
  let counter = 0;

  return itineraries.map((route) => {
    counter++;
    return (
      // <li>
      <li key={route.startTime}>
        <div className=" uk-card uk-card-body uk-card-default">
          <h1 className="uk-card-title">Route {counter}</h1>
          <div>
            {
              route.legs.map((step) => {
                let from;
                let to;

                if (!step.route) {
                  from = step.from.name;
                  to = step.to.name;
                }

                else {
                  from = `stop ${step.from.stop.code}, ${step.from.stop.name}`;
                  to = `stop ${step.to.stop.code}, ${step.to.stop.name}`;
                }

                return (
                  <div key={step.startTime}>
                    <p>
                      {addLeadingZeroes(new Date(step.startTime).getHours())}
                      :{addLeadingZeroes(new Date(step.startTime).getMinutes())}
                      ...
                      {addLeadingZeroes(new Date(step.endTime).getHours())}
                      :{addLeadingZeroes(new Date(step.endTime).getMinutes())}
                      <br/>
                      {step.mode}{step.route ? ': ' + step.route.shortName : ''}
                      <br/> {from} &#8594; {to}</p>
                  </div>
                );
              })
            }
          </div>
        </div>
      </li>
    );
  });
};

export default function Timetable({from, to}){
  const {loading, error, data} = useQuery(
    ROUTE_QUERY,
    {
      variables: {from, to},
      pollInterval: 1000*60,
    }
  );

  if (loading) {
    return (
      <div className="uk-width-1-2">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (error) {
    return <h1>Error! {error}</h1>;
  }

  if (data.plan.itineraries.length === 0) {
    return (
      <div className="uk-width-1-2">
        <h3>No routes found</h3>
      </div>
    );
  }

  return (
    <div className="uk-width-1-2">
      <h3>{from.split('::')[0]} <br/>&#8594; {to.split('::')[0]}</h3>
      <ul className="uk-list">
        {renderTimetable(data.plan.itineraries)}
      </ul>
    </div>
  );
}
