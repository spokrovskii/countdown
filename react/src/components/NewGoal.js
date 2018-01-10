import React, { Component } from 'react';
import moment from 'moment';

class  NewGoal extends Component {
  constructor(props) {
    super(props);

    this.state ={
      errors: {},
      name: '',
      description: ''
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNameCreation = this.handleNameCreation.bind(this);
    this.handleDescriptionCreation= this.handleDescriptionCreation.bind(this);

  }

  handleNameCreation(event){
    this.setState({ name: event.target.value })
  }

  handleDescriptionCreation(event){
    this.setState({ description: event.target.value})
  }

  handleFormSubmit(event){
    event.preventDefault();
    $.ajax({
      url:`/api/v1/goals`,
      type: 'POST',
      dataType:'json',
      contentType: 'application/json',
      data: JSON.stringify({ name: this.state.name, description: this.state.description })
    })
    .done((data) => {
      console.log("goal created")
      if (data.errors) {
        this.setState({ errors: data.errors });
      } else {
        this.setState({ name: '', description: '' });
      }
    });
  }

  render() {
    let nameError = <div className="error"><span className="error-star">*</span>{this.state.errors.name}</div>
    let descriptionError = <div className="error"><span className="error-star">*</span>{this.state.errors.decription}</div>

    return (
      <form className="callout" onSubmit={this.handleFormSubmit}>
        {nameError}
        <label>Name</label>
        <input
          type="text"
          value={this.state.name}
          name = 'name'
          onChange={this.handleNameCreation}
        />
        {descriptionError}
        <label>Description</label>
        <input
          type="text"
          value={this.state.description}
          name = 'name'
          name = 'description'
          onChange={this.handleDescriptionCreation}
          />
          <div className="button-group">
            <button className="button" type="submit">Save</button>
          </div>
        </form>
    );
  }
}

export default NewGoal;
