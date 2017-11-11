import React, { Component } from 'react';
import Goal from './Goal';
import moment from 'moment';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goals: [],
      amountTimeLeft: []
    };

    this.getGoals = this.getGoals.bind(this);
    this.populateGoals = this.populateGoals.bind(this);
    this.timeLeftToFinish = this.timeLeftToFinish.bind(this);
  }

  componentDidMount(){
    this.getGoals();
  }

  getGoals() {
    $.ajax({
      url: `http://localhost:3000/api/v1/goals.json`,
      method: 'GET',
      success: this.populateGoals
    });
  }

  populateGoals(data) {
    this.setState({ goals: data.goals });
  }

  timeLeftToFinish(due_time) {
    let today = new Date();
    let amountTimeLeft = due_time - today;
    this.setState( {timeLeft: amountTimeLeft})

  }

  render() {


    let goals = this.state.goals.map(goal => {
      let amountOfTimeLeft = () => this.timeLeftToFinish(goal.due_time)
      return(
        <Goal
          key={goal.id}
          name={goal.name}
          description={goal.description}
          startDate={moment(goal.created_at).format("MMMM Do YYYY, h:mm a")}
          amountTimeLeft={moment(this.state.amountTimeLeft).format("MMMM Do YYYY, h:mm a")}
        />
      )
    });

    return(
      <div>
        <h1>Goals</h1>
        <div>
          {goals}
        </div>
      </div>
    );
  }
}

export default Timer;
