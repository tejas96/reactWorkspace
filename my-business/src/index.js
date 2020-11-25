import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './scss/style.scss';

import MyBusinessApplication from './common/core/MyBusinessApp/MyBusinessApplication';


ReactDOM.render(
  <React.StrictMode>
    <MyBusinessApplication/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

