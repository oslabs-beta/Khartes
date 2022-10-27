import * as React from 'react';
import { HashRouter, useNavigate, Link, Route, Routes } from "react-router-dom";
// we need to import navigate so that we can navigate between paths ONLY INSIDE ROUTER PAGES
// const navigate = useNavigate();

import './assets/style.css';

import NavBar from './components/NavBar';

// import pages for React Router
import WelcomePage from './components/WelcomePage';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import AlertsPage from './components/AlertsPage';
import YamlPage from './components/YamlPage';

// Created frontend routes with Welcome Page default. Navbar consists of links to routes.
const App = () => {

  return(
    <HashRouter basename="/">
      <main id="page">
        <div id="welcome-page">
          <Link to="/">
          <h1 id="company">Khartes</h1>
          </Link>
          <NavBar />
        </div>
        <Routes>
          <Route path="/" element= {
            <WelcomePage />
          }
          />
          <Route path="/home" element= {
            <HomePage />
          }
          />
          <Route path="/alerts" element= {
            <AlertsPage />
          }
          />
          <Route path="/yaml" element = {
            <YamlPage />
          }
          />
        </Routes>
      {/* Link to Home */}
      </main>
    </HashRouter>
  )
}

export default App;