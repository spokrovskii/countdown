import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './components/Timer';


$(function () {
    ReactDOM.render(
      <Timer />,
      document.getElementById('timer')
    );
});
