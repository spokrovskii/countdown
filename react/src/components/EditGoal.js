import React, { Component } from 'react';
import Goal from './Goal';

class EditGoal extends Component {
  constructor(props){
    super(props);
    this.state = {
      updateGoalErrors: [],
      name: '',
      description: '',
      id: '',
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getNameValue = this.getNameValue.bind(this);
  }

  componentDidMount() {
    this.getNameValue();
  }

  getNameValue(name) {
    this.setState({name: this.props.name});
    this.setState({description: this.props.description});
    this.setState({id: this.props.goal.id});
  }

  handleChangeName(event) {
    this.setState({name: event.target.value })
  }
  handleChangeDescription(event) {
    this.setState({description: event.target.value })
  }

  handleSubmit(event){
    event.preventDefault();
    $.ajax({
      url: `/api/v1/goals/${this.state.id}`,
      method: 'PUT',
      dataType:'json',
      contentType: 'application/json',
      data: JSON.stringify({ name: this.state.name, description: this.state.description })
    })
    .done((data) => {
      if (data.errors) {
        this.setState({ updateGoalErrors: data.errors });
      } else {
        this.props.update(this.state.name, this.state.description);
      }
    });
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
      <div className="name-label">
          New name:
        </div>
        <div>
          <input className="field-input" value={this.state.name}
                    onChange={this.handleChangeName} />
        </div>
        <div className="name-label">
          New description:
        </div>
        <div>
          <textarea rows="5" className="field-input " value={this.state.description}
                    onChange={this.handleChangeDescription} />
        </div>
        <input type="submit" value="Save" />
      </form>
    );
  }
}

export default EditGoal;
