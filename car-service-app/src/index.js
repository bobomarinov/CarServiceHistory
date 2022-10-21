import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CarInfo from './CarInfo';
import CarAdd from './CarAdd'
import EventAdd from './EventAdd';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EventAdd/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
