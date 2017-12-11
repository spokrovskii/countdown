import React from 'react';

const Timer = props => {
  return (
    <div>
    <div>{props.isExpired}</div>
    <div>{props.days}</div>
    <div>{props.hours}</div>
    <div>{props.minutes}</div>
    <div>{props.seconds}</div>
</div>
  )
}

export default Timer;
