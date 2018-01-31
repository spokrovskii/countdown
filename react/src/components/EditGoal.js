import React, { Component } from 'react';

class EditGoal extends Component {
  constructor(props){
    super(props);
    this.state = {
      updateGoalErrors: [],
      updatedName: '',
      updatedDescription: '',
    }
    this.updateName = this.updateName.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  updateName(event){
    this.setState({updateName: event.target.value })
  }


  saveChanges(event){
    event.preventDefault();
    $.ajax({
      url: `/api/v1/goals/${goal.id}`,
      method: 'PUT'
    })
    .done((data) => {
      console.log("goal updated")
      if (data.errors) {
        this.setState({ updateGoalErrors: data.errors });
      } else {
        this.setState({ name: '', description: '' });
      }
    });
  }

render() {
  return(
    <div>
      <div>
        <textarea value={this.props.name}
                  onChange={this.updateName}>

        </textarea>
      </div>
      <div>{this.props.description}</div>
      <div>{this.props.dueTime}</div>
      <div><button onClick={this.saveChanges}>Save</button></div>
    </div>
  );
}

}

export default EditGoal;
