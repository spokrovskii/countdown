import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Goals from './components/Goals';



$(function () {
    ReactDOM.render(
      <Goals />,
      document.getElementById('timer')
    );
});
