import React, { Component } from 'react';
import Goal from '/.components/Goal';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goals: []
    };

    this.getGoals = this.getGoals.bind(this);
    this.populateGoals = this.populateGoals.bind(this);
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

  render() {
    let goals = this.state.goals.map(goal => {
      return(
        <Goal
          key={goal.id}
          name={goal.name}
          description={goal.description}
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
