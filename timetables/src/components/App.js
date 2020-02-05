import React from 'react';

import Clock from './Clock';
import Timetable from './Timetable';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      time: new Date()
    }
  }

componentDidMount(){
    this.timerID = setInterval(() => {
      this.tick()
    },1000);
  }
  
  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({
      time: new Date()
    });
  }

  render() {
    let dt = this.state.time;
    console.log(typeof(dt.getSeconds()))
    return (
      <div>
        <Clock time={dt}/>
        <Timetable title={(dt.getSeconds()%2)}/>
        <Timetable title={(dt.getSeconds()%3)}/>
      </div>
    );
  }
}

export default App;
