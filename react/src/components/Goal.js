import React, { Component } from 'react';
import moment from 'moment';
import Timer from './Timer';
import { Form, FormControl, Button, Grid } from 'react-bootstrap'

class Goal extends Component {
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
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(goal) {
    this.props.onDelete(this.props.goal);
  }

  handleEdit() {
  this.props.onEdit(this.props.goal);
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
      time = <Timer isExpired={isExpired} />
      } else {
        if (this.leading0(this.state.days) == 0) {
          time = <Timer
                  days={<div className="hidden">{this.leading0(this.state.days)} days </div>}
                  hours={<div className="timer-hours">{this.leading0(this.state.hours)} :</div>}
                  minutes={<div className="timer-minutes">{this.leading0(this.state.mins)} :</div>}
                  seconds={<div className="timer-seconds">{this.leading0(this.state.secs)}</div>}
                  />
        } else {
          time = <Timer
                  days={<div className="timer-days">{this.leading0(this.state.days)} days </div>}
                  hours={<div className="timer-hours">{this.leading0(this.state.hours)} :</div>}
                  minutes={<div className="timer-minutes">{this.leading0(this.state.mins)} :</div>}
                  seconds={<div className="timer-seconds">{this.leading0(this.state.secs)}</div>}
                  />
        }
      }
    return(

      <div>
         <div className="row">
          <div className="col-xs-6">
            <div className="name">{this.props.name}</div>
              <div className="col-xs-11 no-padding">
                <div className="description">{this.props.description}</div>
                <hr />
              </div>
            </div>
            <div className="col-xs-3 no-padding">
              {this.props.children}
                <div className="due-date">{this.props.dueTime}</div>
              <div className="no-padding clock">{time}</div>
            </div>
            <div className="col-xs-3 no-padding">
              <div className="start-date no-padding">{this.props.startDate}</div>
              <Button className="btn btn-outline-primary btn-sm create-edit" type="submit" onClick={this.handleDelete}>Delete Goal</Button>
              <Button className="btn btn-outline-primary btn-sm" type="submit"  onClick={this.handleEdit}>Edit Goal</Button>
            </div>
         </div>


       </div>


    );

  }
}

export default Goal;
