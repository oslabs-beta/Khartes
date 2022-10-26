import * as React from 'react';
import { HashRouter, Link, Route, Routes } from "react-router-dom";

import './assets/style.css';

import NavBar from './components/NavBar.tsx';

// import pages for React Router
// Welcome
// Home
// Alerts
// Yaml


const App = () => {


  return(
    <div>
      Hello!
      <div id='yellow'> Yellow </div>
    <div id='blue'> Blue </div>
    </div>
    
  )
}

export default App;