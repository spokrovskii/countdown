import React from 'react';

const Goal = props => {
  return(
    <div>
      <div>{props.name}</div>
      <div>{props.description}</div>
      <div>{props.startDate}</div>
    </div>
  );
}

export default Goal;
