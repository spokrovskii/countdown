import React from 'react';
import moment from 'moment';

const Goal = props => {
  return(
    <div>
      <div>{props.name}</div>
      <div>{props.description}</div>
      <div>{props.startDate}</div>
      <div>{props.amountTimeLeft}</div>
    </div>
  );
}

export default Goal;
