import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import axios from 'axios';

import LocationForm from './LocationForm';
import Clock from './Clock';
import Timetable from './Timetable';

const client = new ApolloClient({
  uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
});

const TICK_RATE = 1000*60;

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      time: new Date(),
      location1: {
        name: "Pohjoinen Rautatiekatu 25", 
        coordinates:{
          lon: null, 
          lat: null
        }
      },
      location2: {
        name: "Kauppakeskus Sello", 
        coordinates: {
          lon: null, lat: null
        }
      }
    }
  }

  // changeLocations = (a,b) => {
  //   this.setLocation(a,b);
  // }

  componentDidMount(){
    console.log('MOUNTING COMPONENT')
    this.setLocation(this.state.location1.name,this.state.location2.name);
    this.timerID = setInterval(() => {
      this.tick()
    },TICK_RATE);
  }
  
  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({
      time: new Date()
    });
  }

  // https://stackoverflow.com/a/27709663
  locationIsSet(coordinates){
    for (var key in coordinates) {
      if (coordinates[key] !== null || coordinates[key] !== '') {
        return true;
      }
    }
    return false;
  }

  setLocation = async (a,b) => {
    let l1 = await this.getCoordinates(a);
    let l2 = await this.getCoordinates(b);
    this.setState({
      time: new Date(),
      location1: l1,
      location2: l2
    })
    console.log('Coordinates set')
  }

  getCoordinates(location){
    return axios.get(
      `https:api.digitransit.fi/geocoding/v1/search?text=${location}&size=1`)
      .then(res => {
        console.log(res.data.features[0].properties.name);
        return {
          name: res.data.features[0].properties.name,
          lon: res.data.features[0].geometry.coordinates[0],
          lat: res.data.features[0].geometry.coordinates[1]  
        }
      })
  }

  parseObjectToString(obj){
    return `${obj.name}::${obj.lat},${obj.lon}`
  }

  render() {
    let dt = this.state.time;
    let l1 = this.parseObjectToString(this.state.location1);
    let l2 = this.parseObjectToString(this.state.location2);
    console.log(l1, l2)
    console.log(this.state.location1, this.state.location2)
    return (
      <div>
        <Clock time={dt}/>
        <LocationForm
          changeLocation={this.setLocation}
        />
        <ApolloProvider client={client}>
          <div className="uk-padding uk-background-muted uk-container">
            <div
              className="uk-flex" 
              uk-grid="true"
              uk-height-match="target:.uk-card;row: false"
            >
              <Timetable
                from={l1} 
                to={l2}
              />
              <Timetable 
                from={l2}
                to={l1}
              />
            </div>
          </div>
        </ApolloProvider>
      </div>
      
    );
  }
}

export default App;
