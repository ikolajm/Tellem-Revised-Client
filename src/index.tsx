  
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    {/* React router */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);