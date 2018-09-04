import React, { Component } from 'react';
import moment from 'moment';
import Clock from './Clock';
import { Form, FormControl, Button, Grid } from 'react-bootstrap'

class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      days:0,
      hours:0,
      mins: 0,
      secs: 0,
      expired: false,

    };
    this.getTimeUntill = this.getTimeUntill.bind(this);
  }

  componentWillMount() {
    this.getTimeUntill(this.props.deadline);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.getTimeUntill(this.props.deadline), 1000)
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  leading0(num) {
  return num < 10? '0' + num : num;
  }

  getTimeUntill(deadline) {
    let currentDate = new Date();
    let timeLeft = new Date(deadline)
    timeLeft = timeLeft - currentDate;
    if (timeLeft < 0) {
      this.setState({expired:true})
    } else {
      let days = parseInt(timeLeft/(24*3600*1000));
      let hours = parseInt(timeLeft/(3600*1000)-(days*24));
      let mins = parseInt(timeLeft/(60*1000)-(days*24*60)-(hours*60));
      let secs = parseInt(timeLeft/(1000)-(mins*60)-(days*24*60*60)-(hours*60*60));

      this.setState({days, hours, mins, secs})
      }
  }

  render() {

    let isExpired;
    let time = null;
    if (this.state.expired) {
      isExpired ='Time is up';
      time = <Clock isExpired={isExpired} />
      } else {
        if (this.leading0(this.state.days) == 0) {
          time = <Clock
                  days={<div className="hidden">{this.leading0(this.state.days)} days </div>}
                  hours={<div className="timer-hours">{this.leading0(this.state.hours)} :</div>}
                  minutes={<div className="timer-minutes">{this.leading0(this.state.mins)} :</div>}
                  seconds={<div className="timer-seconds">{this.leading0(this.state.secs)}</div>}
                  />
        } else {
          time = <Clock
                  days={<div className="timer-days">{this.leading0(this.state.days)} days </div>}
                  hours={<div className="timer-hours">{this.leading0(this.state.hours)} :</div>}
                  minutes={<div className="timer-minutes">{this.leading0(this.state.mins)} :</div>}
                  seconds={<div className="timer-seconds">{this.leading0(this.state.secs)}</div>}
                  />
        }
      }
    return(
            <div className="col-xs-10 no-padding">
              <div className="clock">{time}</div>
            </div>
    );
  }
}

export default Timer;
