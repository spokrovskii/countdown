import React, { Component } from 'react';
import moment from 'moment';
import { Form, FormControl, Button } from 'react-bootstrap';
import DateTime from 'react-datetime';


class  NewGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      name: '',
      description: '',
      dueDateTime: moment(),
      created: ''
    }
    this.handleNameCreation = this.handleNameCreation.bind(this);
    this.handleDescriptionCreation = this.handleDescriptionCreation.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.hanleDueDateTime = this.hanleDueDateTime.bind(this);

  }

  handleNameCreation(event) {
    this.setState({ name: event.target.value })
  }

  handleDescriptionCreation(event) {
    this.setState({ description: event.target.value })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    $.ajax({
      url:`/api/v1/goals`,
      type: 'POST',
      dataType:'json',
      contentType: 'application/json',
      data: JSON.stringify({ name: this.state.name, description: this.state.description, due_time: this.state.dueDateTime })
    })
    .done((data) => {
      console.log("goal created")
      this.setState({ created:'Goal successfully created'})
      if (data.errors) {
        this.setState({ errors: data.errors });
      } else {
        this.setState({ name: '', description: '', due_time:'', created:'Goal was successfully created'});
      }

    });
  }

  hanleDueDateTime(date) {
    this.setState({ dueDateTime: date });
  }

  render() {
    let nameError = <div className="error"><span className="error-star"></span>{this.state.errors.name}</div>
    let descriptionError = <div className="error"><span className="error-star"></span>{this.state.errors.decription}</div>
    let flashGoalCreated = <div className="flashGoalCreated">{this.state.created}</div>
    return (
      <div className="col-xs-8 col-xs-offset-2 margin-new-goal">
        <div className="form-group">
          <Form className="callout" onSubmit={this.handleFormSubmit}>
            {nameError}
            <label>Name</label>
            <FormControl
              type="text"
              value={this.state.name}
              name = 'name'
              onChange={this.handleNameCreation}
            />
            {descriptionError}
            <div className="form">
              <label>Description</label>
               <textarea className="form-control" rows="4"
                type="text"
                value={this.state.description}
                name = 'description'
                onChange={this.handleDescriptionCreation}
              />
            </div>
          <label>Select date and time</label>
              <DateTime
                selected={this.state.dueDateTime}
                onChange={this.hanleDueDateTime}
            />
            <div>
              <Button className="btn btn-outline-primary" type="submit">Save</Button>
            </div>
          </Form>
          {flashGoalCreated}
        </div>
      </div>
    );
  }
}

export default NewGoal;
