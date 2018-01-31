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
      let hours =parseInt(timeLeft/(3600*1000)-(days*24));
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
      time = <Timer
              days={<div className="Clock-days">{this.leading0(this.state.days)} days</div>}
              hours={<div className="Clock-hours">{this.leading0(this.state.hours)} hours</div>}
              minutes={<div className="Clock-minutes">{this.leading0(this.state.mins)} minutes</div>}
              seconds={<div className="Clock-seconds">{this.leading0(this.state.secs)} seconds</div>}
              />
    }
    return(

      <div>
         <div>
           <div>{this.props.name}</div>
           <div>{this.props.description}</div>
           <div>{this.props.startDate}</div>
           <div>{this.props.dueTime}</div>
           <div>{this.props.children}</div>
         </div>
         <div>{time}</div>
         <button className = "Delete-goal" onClick={this.handleDelete}>Delete Goal</button>
         <button className = "Edit-goal" onClick={this.handleEdit}>Edit Goal</button>
       </div>


    );

  }
}

export default Goal;
