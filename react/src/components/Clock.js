import React from 'react';

const Clock = props => {
  return (
    <div className="timer-display">
      <div className="inline">{props.isExpired}</div>
      <div className="timer-days">{props.days}</div>
      <div className="timer-hours">{props.hours}</div>
      <div className="timer-minutes">{props.minutes}</div>
      <div className="timer-seconds">{props.seconds}</div>
    </div>
  )
}

export default Clock;
