import React from 'react';

const Timer = props => {
  return (
    <div>
      <div className ="Inline">{props.isExpired}</div>
      <div className ="Inline">{props.days}</div>
      <div className ="Inline">{props.hours}</div>
      <div className ="Inline">{props.minutes}</div>
      <div className ="Inline">{props.seconds}</div>
    </div>
  )
}

export default Timer;
