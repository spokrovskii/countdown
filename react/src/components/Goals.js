import React, { Component } from 'react';
import Goal from './Goal';
import EditGoal from './EditGoal';

import moment from 'moment';

class Goals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goals: [],
      editingGoalId: 0,
      update: 'false'
    };
    this.getGoals = this.getGoals.bind(this);
    this.populateGoals = this.populateGoals.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
    this.editGoal = this.editGoal.bind(this);
    this.updateGoals = this.updateGoals.bind(this);
  }

  componentDidMount(){
    this.getGoals();
  }

  getGoals() {
    $.ajax({
      url: `/api/v1/goals`,
      method: 'GET',
      success: this.populateGoals
    });
  }

  populateGoals(data) {
    this.setState({ goals: data.goals });
  }

  deleteGoal(goal) {
    $.ajax({
      url: `/api/v1/goals/${goal.id}`,
      method: 'DELETE'
    })
    .done((data) => {
      this.getGoals();
      console.log('Goal deleted!');

    })
    .fail((response) => {
      console.log.error('There was a problem deleting that goal.');
    });
  }

  editGoal(goal) {
    this.setState({ editingGoalId: goal.id })
  }

  updateGoals(name, description) {
  let goals = this.state.goals;

  goals = goals.map((currentGoal) =>{
    if(currentGoal.id == this.state.editingGoalId) {
      currentGoal.name = name;
      currentGoal.description = description;
    }
    return currentGoal;
  });
  this.setState({ goals: goals });
  this.setState({ editingGoalId: 0 })
  }

  render() {

    const goals = this.state.goals.map(goal => {
      if(this.state.editingGoalId === goal.id) {
        return(
          <EditGoal key={goal.id}
                    name={goal.name}
                    description={goal.description}
                    dueTime={moment(goal.due_time).format("lll")}
                    goal={goal}
                    update={this.updateGoals}
           />
          );
       } else {
         return(
          <Goal key={goal.id}
                name={goal.name}
                description={goal.description}
                startDate={moment(goal.created_at).format("lll")}
                dueTime={moment(goal.due_time).format("lll")}
                deadline={goal.due_time}
                goal={goal}
                onDelete={this.deleteGoal}
                onEdit={this.editGoal}
          />
          );
        }
    });
  return(
    <div>
      <div className="row">
        <div className="col-xs-12 no-padding">
          <div className="title">Goals</div>
        </div>
        <div className="col-xs-6 sub-title">
          NAME OF THE GOAL
        </div>
        <div className="col-xs-3 subtitle-no-margin">
          TIME LEFT UNTILL
        </div>
        <div className="col-xs-3 sub-title">
          CREATED
        </div>
        {goals}
      </div>
    </div>
    );
  }
}

export default Goals;
