import React from 'react';

const Timer = props => {
  return (
    <div className="timer-display">
      <div className="Inline">{props.isExpired}</div>
      <div className="timer-days">{props.days}</div>
      <div className="timer-hours">{props.hours}</div>
      <div className="timer-minutes">{props.minutes}</div>
      <div className="timer-seconds">{props.seconds}</div>
    </div>
  )
}

export default Timer;
