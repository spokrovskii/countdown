import React from 'react';
import moment from 'moment';
import Timer from './Timer';
import { Form, FormControl, Button, Grid } from 'react-bootstrap'

const Goal = props => {

  const handleDelete = (goal) => {
   props.onDelete(props.goal);
  }

  const handleEdit = () => {
    props.onEdit(props.goal);
  }

  return (
    <div>
      <div className="row">
        <div><spam><hr /></spam></div>
        <div className="col-sm-6 no-padding">
          <div className="name">{props.name}</div>
            <div className="col-xs-11 no-padding">
              <div className="description">{props.description}</div>
            </div>
          </div>
          <div className="col-sm-6 no-padding">
          <div className="col-xs-6 no-padding">
              <div className="due-date">{props.dueTime}</div>
            <div>
              <Timer
                key = {props.goal.id}
                deadline = {props.goal.due_time}
               />
            </div>
          </div>
          
          <div className="col-xs-6 no-padding">
            <div className="start-date">{props.startDate}</div>
            <div className="glyphicon glyphicon-trash" type="submit" onClick={handleDelete}></div>
            <div className="glyphicon glyphicon-pencil" type="submit"  onClick={handleEdit}></div>
          </div>
          </div>
       </div>
     </div>


  );
};

export default Goal;
