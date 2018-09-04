import React, { Component } from 'react';
import Goal from './Goal';

class EditGoal extends Component {
  handleChangeName(event) {
    const newName = event.target.value;
    this.props.changeName(newName);
  }

  handleChangeDescription(event) {
    const newDescription = event.target.value;
    this.props.changeDescription(newDescription);
  }

  handleSubmit(event){
    event.preventDefault();
    $.ajax({
      url: `/api/v1/goals/${this.props.id}`,
      method: 'PUT',
      dataType:'json',
      contentType: 'application/json',
      data: JSON.stringify({ name: this.props.newName, description: this.props.newDescription })
    })
    .done((data) => {
      if (data.errors) {
        this.setState({ updateGoalErrors: data.errors });
      } else {
        this.props.update(this.props.newName, this.props.newDescription);
      }
    });
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <input defaultValue={this.props.name}
                    onChange={this.handleChangeName.bind(this)} />
        </div>
        <div>
          <input defaultValue={this.props.description}
                    onChange={this.handleChangeDescription.bind(this)} />
        </div>
        <input type="submit" value="Save" />
      </form>
    );
  }
}

export default EditGoal;
