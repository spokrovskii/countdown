import React, { Component } from 'react';
import Goal from './Goal';

import moment from 'moment';

class Goals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goals: [],
    };
    this.getGoals = this.getGoals.bind(this);
    this.populateGoals = this.populateGoals.bind(this);
  }

  componentDidMount(){
    this.getGoals();
  }

  getGoals() {
    $.ajax({
      url: `/api/v1/goals.json`,
      method: 'GET',
      success: this.populateGoals
    });
  }

  populateGoals(data) {
    this.setState({ goals: data.goals });
  }

  render() {

    let goals = this.state.goals.map(goal => {

      return(
        <Goal
          key={goal.id}
          name={goal.name}
          description={goal.description}
          startDate={moment(goal.created_at).format("MMMM Do YYYY, h:mm a")}
          dueTime={moment(goal.due_time).format("MMMM Do YYYY, h:mm a")}
          deadline={goal.due_time}
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

export default Goals;
