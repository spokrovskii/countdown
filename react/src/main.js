import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Goals from './components/Goals';
import NewGoal from './components/NewGoal';

$(function () {
  let timer = document.getElementById('timer');
    if (timer){
      ReactDOM.render(
        <Goals />,
        timer
    );
  }

    let newGoal = document.getElementById('new-goal');
    if(newGoal){
      ReactDOM.render(
        <NewGoal />,
        newGoal
      );
    }
});
